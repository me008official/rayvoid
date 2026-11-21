CREATE TABLE IF NOT EXISTS admin_auth_attempts (
  request_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  status ENUM('pending', 'received', 'rejected', 'consumed') NOT NULL DEFAULT 'pending',
  access_token_encrypted TEXT NULL,
  profile_endpoint VARCHAR(512) NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (request_id),
  KEY idx_admin_auth_attempts_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
