#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DataTableNestUiStack } from "../lib/data-table-nest-ui-stack";

const app = new cdk.App();
new DataTableNestUiStack(app, "DataTableNestUiStack", {
  domainName: "datatablenest.com",
  siteSubDomain: "www",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
