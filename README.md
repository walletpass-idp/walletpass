# Menyala NextJS Hackathon Starter

This Next.js Web3 Starter is a full stack starter repository designed for decentralized application (dApp) development during hackathons. It comes with TypeScript and is built to help you quickly get started with your Web3 project.

# Code Structure

Next13 introduce the concept of non-routes folder as defined by (), so any folder names such as (auth)
, (landing-unprotected) and (protected) do not affect the routes but act as the logical grouping of the pages and components.
so in the template example, we have the following routes:

- auth
- dashboard
- profile

Logical groupings that derived from the actual routes are (auth), (protected) and (unprotected)

UI Components generated from shadcn sdk are automatically parked in `components/ui` and are subjected to customisation. Custom UI components created should go directly under `components` folder. There can be subfolder like `example1` for logical grouping of components as well

# Tech Stack

- Nextjs
- Tailwind CSS
- Shadcn UI (customisable UI)
- Valtio (self-aware proxy state)
- Framer-motion
- Viem
- Wagmi
- NextAuth
- Self-Custodian Wallet
  - Wallet Connect
  - SIWE
- Prisma (if needed)
- Postgres (if needed: supabase/vercel)

## Use the template

Create a new repo with this template

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`
`NEXT_PUBLIC_W3C_PID`
`NEXT_PUBLIC_SIGNIN_MESSAGE`
`NEXTAUTH_SECRET`

- example contracts
  `NEXT_PUBLIC_GREETING_CONTRACT`="0x2459b55d846656f9BD9ddA049662f5da80B7c534"
  `NEXT_PUBLIC_NFT_CONTRACT`="0x984971D869173102b36312A3EE9B4C476BdA0aE2"

## Roadmap

- ~~More viem usage examples soon~~
- Additional Rainbow Kit integration
- More shadcn UI integration
  - ~~Card Component~~
  - ~~Button Component~~
  - ~~Dropdown Component~~
- More commonly used UI Components
  - ~~Navbar Component~~
  - ~~ModeToggle Component~~
- ~~Framer Motion Integration~~
- ~~Theme Integration~~
- OpenAI code template integration
