# light serverless

## Summary

On my first serverless projects, I used hapi(https://hapi.dev/) wrapped in a lambda.  
There is only one endpoint and it is proxied to the hapi application.

On my current project, I wanted to use AWS HTTP API for routing.  Each endpoint points to
a different lambda.

I initial tried to put all the stuff I learnd in this repo but it got complicated quickly.
This repo will focus on the code that's handling the callback from the lambda event.

## Architecture

![Architecture](/images/architecture.png)

This repo implements a CRUD for a user Entity.  It also has authentication using firebase.

### Flow
Browser gets the JWT token after authenticating with firebase.  The JWT Token is passed
in the header to endpoints needing authentication.

API Gateway handles authentication. Lambda then handles the logic for the CRUD.

Note: `Invoke Local` is when you are testing the code directly from your computer.

# Code Layers
`serverless.yaml` contains definitions for the gateway, authorizer and the endpoints.  The
enpoints point to the entry point in the code.  For this project, it goes to the
`routes/<entity>`.

The `routes` validates all parameters passed through the endpoints.  Any unexpected or
missing parameter returns an error.

The `routes` passes the information to the `model`.  In this repo, the model is
fairly empty but in production, this will contain all the business logic.

If necessary the `model` has a `database layer` that handles querying the database.
