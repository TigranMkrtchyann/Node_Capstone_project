module.exports = {
PORT:process.env.PORT || 3000,
POSTGRES_USER:process.env.POSTGRES_USER || "myuser",
POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD || "mypassword",
POSTGRES_HOST:process.env.POSTGRES_HOST || "localhost",
POSTGRES_PORT:process.env.POSTGRES_PORT || 5432,
POSTGRES_DB:process.env.POSTGRES_DB || "mydatabase"
}
