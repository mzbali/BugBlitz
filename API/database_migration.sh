#!/bin/bash

# Prompt for the database name with default value "bugblitz"
read -p "Enter the database name (default: bugblitz): " database_name
database_name=${database_name:-bugblitz}

# Connect to the PostgreSQL container and drop the database
docker exec -it postgres psql -U postgres -c "DROP DATABASE IF EXISTS $database_name"

# Prompt for the migration name with default value "InitialMigrations"
read -p "Enter the migration name (default: InitialMigrations): " migration_name
migration_name=${migration_name:-InitialMigrations}

# Delete Migration Folder
rm -rf Data/Migrations

# Run EF Core migrations
dotnet ef migrations add "$migration_name" -o Data/Migrations
