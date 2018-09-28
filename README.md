# React App Service Template

## Setup

### CLI

See https://github.com/wirelineio/darkstar/blob/master/%40wirelineio/cli/README.md for CLI and access key setup instructions.

### Create project

- using git:

```
git clone --depth=1 git@github.com:wirelineio/react-app-service-template.git <service name>
cd <service name>
rm -rf .git
```
- using CLI:

```
WRL_GITHUB_TOKEN=token wrl create --template="https://github.com/wirelineio/react-app-service-template" --path="<service name>"
cd <service name>
```

### Install Packages

```
yarn install
```

### Change service.yml and stack.yml

Edit service.yml and stack.yml and change the service and stack names.

## Service Register

```
$ yarn build
```

```
$ wire service register --domain example.com

Domain           Name                            Version         Content Hash                                                            Versions
---------------------------------------------------------------------------------------------------------------------------------------------------
example.com      react-app-service-template                0.0.1           52cdbe12f3119fb929edccd5d3be5206a02b30665006ee21796e6720f3813bde
```

## Service Upload Assets

```
$ yarn build
```

```
$ wire service upload-assets --domain example.com

Service                         Version         File Content Hash                                                       Upload Required     URL
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
react-app-service               0.0.1           4393d67a31c61f116d639cb688c28c14cf782527e7c559e121b7b1d102259f19        No                  https://s3.amazonaws.co
m/wireline-service-static-assets/a379a6/react-app-service/0.0.1/app.js
react-app-service               0.0.1           33fb1f0137b0f19ed6bfdb31aa1d213ae65dc041355c2ce83d6cf4c53645466c        No                  https://s3.amazonaws.co
m/wireline-service-static-assets/a379a6/react-app-service/0.0.1/app.js.map
react-app-service               0.0.1           2a15a79d614653215c33aecadba61194117d0704e0f316469ac005f9dfa3da7c        No                  https://s3.amazonaws.com/wireline-service-static-assets/a379a6/react-app-service/0.0.1/favicon.ico
react-app-service               0.0.1           66d46e911221879b7b7d4100577c80fb9dd8613fb936d7578e559610637d24c8        No                  https://s3.amazonaws.com/wireline-service-static-assets/a379a6/react-app-service/0.0.1/images/logo_w_blue.png
```

## Stack Deploy

```
$ wire stack deploy

Name                            Service                         Version         Status          Content Hash                                                            Endpoint
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
my-deployment                   wrn::react-app-service-template           0.0.1           IN_PROGRESS
```

```
$ wire stack deploy

Name                            Service                         Version         Status          Content Hash                                                            Endpoint
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
my-deployment                   wrn::react-app-service-template           0.0.1           DONE                                                                                    https://1k06alat20.execute-api.us-east-1.amazonaws.com/dev
```

## Test Endpoint

Open Stack deployment url in your browser

```
open https://1k06alat20.execute-api.us-east-1.amazonaws.com/dev/
```

