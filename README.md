# Endless Kingdoms

Endless Kingdoms is a hourly updated, turn-based RPG web game inspired by D&D. This project is built using the [T3 Stack](https://create.t3.gg/) and serves as a stress test for modern web frameworks.

## Project Overview

Key features and technologies:

- Hourly game updates
- Turn-based RPG mechanics
- [Next.js](https://nextjs.org) for the web framework
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Drizzle ORM](https://orm.drizzle.team) for database management
- [Tailwind CSS](https://tailwindcss.com) for styling
- [tRPC](https://trpc.io) for type-safe APIs
- Docker for containerization
- Kubernetes for orchestration
- ArgoCD for continuous deployment

## Getting Started

To set up and run Endless Kingdoms locally:

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/endless-kingdoms.git
   cd endless-kingdoms
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required variables

4. Start the development environment:
   ```
   docker-compose up -d
   npm run db:push
   npm run dev
   ```
   Troubleshooting Docker Commands:
   ```
   # View logs for a specific service
   docker-compose logs -f <service_name>
   # View logs for all services
   docker-compose logs -f
   # Check the status of all services
   docker-compose ps
   # Restart a specific service
   docker-compose restart <service_name>
   # Stop all services
   docker-compose down
   # Check Docker system logs
   docker system logs
   # Check Docker network logs
   docker network inspect -v
   # Check Docker volume logs
   docker volume inspect -v
   ```

5. Access the application at `http://localhost:3000`

## Kubernetes and ArgoCD Setup

To deploy Endless Kingdoms using Kubernetes and ArgoCD:

1. Ensure you have a Kubernetes cluster set up

2. Install and set up ArgoCD in your cluster:
   ```
   # Install ArgoCD
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

   # Open port for local access
   kubectl port-forward svc/argocd-server -n argocd 8080:443

   # Set the current namespace to argocd (in a new terminal window)
   kubectl config set-context --current --namespace=argocd

   # Get the default ArgoCD admin password
   kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
   ```

   Note: After running these commands, you can access the ArgoCD UI at `https://localhost:8080`. Use "admin" as the username and the password obtained from the last command.

3. Configure ArgoCD to watch your repository

4. Apply the Kubernetes manifests:
   ```
   kubectl apply -f k8s/
   ```

5. ArgoCD will automatically deploy and manage the application

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Apply Drizzle migrations
- `npm run db:studio` - Open Drizzle Studio for database management

## Database

Endless Kingdoms uses PostgreSQL. The database is set up automatically when using Docker Compose for local development.

## Contributing

Contributions to Endless Kingdoms are welcome! Please refer to our contributing guidelines (TODO: add link) for more information.

## Learn More

To learn more about the technologies used in this project, refer to their respective documentation:

- [T3 Stack](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [tRPC Documentation](https://trpc.io/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.