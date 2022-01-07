# MS Club Web Server

Backend API application for MS Club of SLIIT 🌀<br>
Read further to know how **you** can start contributing to MS Club!

## Quick Links

- [Tech Stack](#tech-stack)
- [How to contribute](#how-to-contribute)
- [Learning Resources](#how-can-i-get-start)
- [About Docker Image](#about-docker-image)

## [Tech Stack](#Tech-stack)

![banner-whitegb-spacing-10x(2)](https://firebasestorage.googleapis.com/v0/b/msclubofsliit-v2.appspot.com/o/tech_stack_logo.png?alt=media&token=74635794-1141-411c-8b82-5e90f6113aae)

## [How to contribute](#how-to)

1. Fork the repo on GitHub :octocat:.
2. Clone the project to your own machine. <br>

```
git clone https://github.com/<YOUR_USERNAME>/msclubwebsite.git
```

3. Create a branch using the git checkout command. Branch name prefix should be one of these. <br>
   `feature/<branch_name>` <br>
   `fix/<branch_name>` <br>

```
git checkout -b <your-new-branch-name>
```

4. Stage your changes and commit with a meaningful commit message. **First letter of the commit should be capital** <br>

```
git add .
```

```
git commit -m "<initial commit>"
```

5. Push your work back up to your fork. <br>

```
git push origin <add-your-branch-name>
```

6. Submit a Pull request so that we can review your changes. [Learn about creating a pull request.](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## [How can I get start](#resources)

We got your back. Here are some **FREE** resources for you to strengthen your web development skills and start firing some commits.

**TypeScript**

- [Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript For JS Developers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript Basics by freeCodeCamp](https://www.freecodecamp.org/news/learn-typescript-basics/)

**Node JS / Express**

- [Node JS 14.x Official Documentaion](https://nodejs.org/docs/latest-v14.x/api/)
- [Express Official Documentation](https://expressjs.com/)

## [About Docker Image](#about-docker-image)

We use Docker :whale: image to deploy this API application to the server. You can build and run the docker container in your local machine. Follow below steps to build and run the Docker container. <br>
:memo: In order to build and run the Docker container, you must have Docker install on you computer. <br>

1. Build the Docker image. :building_construction:

```
docker build -t ghcr.io/ms-club-sliit/msclubwebserver:v1.0.0 .
```

2. Check the build Docker images. :heavy_check_mark:

```
docker image ls
```

3. Run the Docker container. After run this command the container will start running. :package: <br>
   `docker run -p <expose_port>:<application_port> -d --name "<name_for_the_container>":<tag>` <br>
   **`-d`** - Run in ditach mode <br>
   **`-p`** - Port mapping between Docker container and application

```
docker run -p 9096:8078 -d --name "mswebserver"  ghcr.io/ms-club-sliit/msclubwebserver:v1.0.0
```

4. Open your web browser and paste below URL :earth_asia:

```
http://localhost:9096
```

5. View the running container :eyes:

```
docker ps
```

6. Stop the running container :stop_sign:

```
docker stop mswebserver
```

7. Remove the Docker container :coffin:

```
docker rm mswebserver
```
