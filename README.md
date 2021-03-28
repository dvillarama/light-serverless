# light serverless

## Summary

On current project, I wanted to use AWS HTTP API for routing and each endpoint is it's own lambda.

I initial tried to put all the stuff I learnd in this repo but it got complicated quickly.
This repo will focus on the code that's handling the callback from the lambda event.

## Architecture

![Architecture](/images/architecture.png)

Browser gets the JWT token after authenticating with firebase.  The JWT Token is passed
in the header for endpoints needing authentication.

There are four endpoints for CRUD and each endpoint is handled by a separate lambda.

Note: `Invoke Local` is when you are testing the code directly from your computer.

## Serverless Framework
- https://www.serverless.com/
A mix of IaC and helper tool for serverless development.

serverless.yaml - contains definitions for the gateway, authorizer and the enpoints
serverless/*.yaml - additional files (this is how to share values accross different serverless yamls)
src - code

