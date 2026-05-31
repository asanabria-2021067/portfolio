-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS tokens (
  hash BYTEA PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expiry TIMESTAMP(0) WITH TIME ZONE NOT NULL,
  scope TEXT NOT NULL
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE tokens;
-- +goose StatementEnd
