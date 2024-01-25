# BugBlitz

Bug tracking app made with .Net 8 and Next.js and authetication with Zitadel.
visit [BugBlitz](https://bugblitz.mzbali.com/)

## Demo

Deployed on Azure VM using Docker Swarm (CapRover) with HTTPS for API & client.

## Built using

### Back-end

- [.NET 8 Core](https://dotnet.microsoft.com/en-us/download) - Backend framework
- [Entity Framework Core](https://github.com/dotnet/efcore) - Object-Relational Mapping (ORM) framework
- [PostgreSQL](https://www.postgresql.org/) - Open-source SQL database to store data
- [ZITADEL](https://zitadel.com/) - For secure authentication and authorisation
- [JWT](https://jwt.io/) - For secure autorisation

### Front-end

- [Next.js](https://nextjs.org/) - Frontend framework
- [React Hook Form](https://react-hook-form.com/) - Library for flexible & extensible forms
- [Shadcn](https://ui.shadcn.com/) heavily customised - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zod](https://zod.dev/) - Form validation tool

### Deployment

- [Docker](https://www.docker.com/) - Containerisation
- [CapRover](https://caprover.com/) - Docker container deployment & management tool
- [Azure](https://azure.microsoft.com/en-gb/) - Cloud platform for hosting
- [Nginx](https://www.nginx.com/) - Reverse proxy for API & client
- [Let's Encrypt](https://letsencrypt.org/) - SSL/TLS certificates for HTTPS
- [Namecheap](https://www.namecheap.com/) - Domain name registrar

## Features

- Authentication (login/register w/ username & password)
- CRUD operations for projects, with ability to add members for group work
- CRUD operations for bugs, with title, description & priority
- Project members can add, edit, close & reopen bugs etc.
- Sort projects/bugs by various parameters like priority, recently closed etc.
- Filter projects/bugs by name/title
- CRUD operations for notes, for guiding other members
- Descriptive color indicators for bug priority & status
- Error management with descriptive messages
- [TODO] Toast notifications for actions: creating projects, removing members etc.
- Loading spinners for fetching processes
- Dark mode toggle w/ local storage save
- Proper responsive UI for all screens

## Usage

## Configuration

Before running the application, you need to set up the environment variables for both the frontend and the backend.

### Frontend

Create a `.env.local` file in the root of the frontend directory and add the following:

```env
NEXT_PUBLIC_SHOW_LOGGER="true"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_API_URL=https://localhost:5000/api
ZITADEL_CLIENT_ID=your_zitadel_client_id
ZITADEL_ISSUER=your_zitadel_issuer
ZITADEL_CLIENT_SECRET=your_zitadel_client_secret
```

Replace `your_nextauth_secret`, `your_zitadel_client_id`, `your_zitadel_issuer`, and `your_zitadel_client_secret` with your actual values.

Run client development server assuming you have Node.js installed and `npm` or `yarn` or `pnpm` installed:

```bash
cd client
npm install
npm run dev
```

### Backend

Update the `appsettings.Development.json` or `appsettings.json` depending where you running it file in the root of the backend directory with the following:

```json
{
  "POSTGRES_PORT": "5432",
  "POSTGRES_HOST": "your_postgres_host",
  "POSTGRES_PASSWORD": "your_postgres_password",
  "POSTGRES_DB": "your_postgres_db",
  "POSTGRES_USER": "your_postgres_user",
  "Zitadel": {
    "Authority": "your_zitadel_authority",
    "MetadataAddress": "your_zitadel_metadata_address",
    "Audience": "your_zitadel_audience",
    "NameClaimType": "preferred_username",
    "Validate-Issuer": true,
    "RequireHttpsMetadata": true
  }
}
```

Run backend development server assuming you have .NET 8 installed:

```bash
cd API
dotnet restore
dotnet watch run
```

Replace `your_postgres_host`, `your_postgres_password`, `your_postgres_db`, `your_postgres_user`, `your_zitadel_authority`, `your_zitadel_metadata_address`, and `your_zitadel_audience` with your actual values.

happy coding! 🚀
