React + GraphQL + Prisma + Docker Compose
=========================================

A project that runs a Prisma API server and a create-react-app, using Docker Compose.

## Prepare API database

```
docker-compose -f docker-compose.prisma-deploy.yml up -d
docker-compose -f docker-compose.prisma-deploy.yml exec api prisma deploy
docker-compose -f docker-compose.prisma-deploy.yml down
```

## Development

```
docker-compose up -d
```

For development, the `backend/` and `frontend/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3000` and it proxies internally to the server using the linked name as `backend:4000`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes

#### Installing npm dependencies

All changes to `node_modules` should happen *inside* the containers. Install any new dependencies by inside the container. You can do this via `docker-compose run`, but it’s easier to just upadte a running container and avoid having to rebuild everything:

```
docker-compose exec frontend sh
```

Then inside:

```
npm install --save <new_dependency>
```

Finally:

```
exit
```