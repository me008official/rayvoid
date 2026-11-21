"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState, useSyncExternalStore } from "react"

const subscribeToUserAgent = () => () => {}
const getIsAndroid = () => /Android/i.test(navigator.userAgent)
const getServerIsAndroid = () => false

export default function LoginForm({ appKey, partnerName }) {
  const router = useRouter()
  const isAndroid = useSyncExternalStore(
    subscribeToUserAgent,
    getIsAndroid,
    getServerIsAndroid
  )
  const [isStarting, setIsStarting] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isPolling) {
      return
    }

    let cancelled = false
    let timer
    let attempts = 0

    const pollStatus = async () => {
      attempts += 1

      try {
        const response = await fetch("/api/auth/truecaller/status", {
          cache: "no-store",
        })
        const result = await response.json()

        if (response.ok) {
          router.replace("/admin")
          router.refresh()
          return
        }

        if (response.status === 202 && attempts < 20) {
          if (!cancelled) {
            timer = setTimeout(pollStatus, 3000)
          }
          return
        }

        setError(result.message || "Truecaller sign-in failed. Please try again.")
        setIsPolling(false)
      } catch {
        setError("Could not check the sign-in status. Please try again.")
        setIsPolling(false)
      }
    }

    timer = setTimeout(pollStatus, 3000)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [isPolling, router])

  const startLogin = async () => {
    setError("")
    setIsStarting(true)

    try {
      const response = await fetch("/api/auth/truecaller/start", {
        method: "POST",
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Could not start Truecaller sign-in.")
      }

      const params = new URLSearchParams({
        type: "btmsheet",
        requestNonce: result.requestNonce,
        partnerKey: appKey,
        partnerName,
        lang: "en",
        loginPrefix: "getstarted",
        loginSuffix: "signin",
        ctaPrefix: "continuewith",
        btnShape: "round",
      })

      setIsPolling(true)
      window.location.assign(
        `truecallersdk://truesdk/web_verify?${params.toString()}`
      )
    } catch (loginError) {
      setError(loginError.message || "Could not start Truecaller sign-in.")
    } finally {
      setIsStarting(false)
    }
  }

  const isConfigured = Boolean(appKey)

  return (
    <section className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Admin access
      </p>
      <h1 className="mb-3 text-3xl font-semibold">Sign in</h1>
      <p className="mb-6 text-sm leading-6 text-neutral-600">
        Verify with the authorized administrator Truecaller account to access
        the RAYVOID control panel.
      </p>

      {!isAndroid && (
        <p className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          Truecaller sign-in is available only in an Android browser.
        </p>
      )}

      {!isConfigured && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          Truecaller sign-in is not configured on the server.
        </p>
      )}

      {isPolling && (
        <p className="mb-4 text-sm text-neutral-600" role="status">
          Waiting for Truecaller verification…
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <Button
        className="w-full"
        disabled={!isAndroid || !isConfigured || isStarting || isPolling}
        onClick={startLogin}
      >
        {isStarting ? "Starting…" : "Continue with Truecaller"}
      </Button>
    </section>
  )
}
