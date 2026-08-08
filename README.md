# CircleCI + Datadog Integration Setup Guide

This guide walks you through setting up CircleCI with Datadog CI Visibility integration.

## Prerequisites

- CircleCI CLI installed ✅
- CircleCI account
- Datadog account with API key
- GitHub account (for repository hosting)

## Step 1: Setup CircleCI Project

### 1.1 Repository Setup

This repository is already pushed to GitHub:
```
https://github.com/irfadkp/circleci-datadog-demo
```

### 1.2 Connect to CircleCI

1. Go to https://circleci.com/
2. Sign in with your GitHub account
3. Click "Projects" in the left sidebar
4. Find your repository and click "Set Up Project"
5. CircleCI will detect the `.circleci/config.yml` file
6. Click "Start Building"

## Step 2: Configure Datadog Webhook Integration

### 2.1 Access Project Settings

1. In CircleCI, go to your project
2. Click on "Project Settings" (gear icon)
3. Navigate to "Webhooks" in the left sidebar

### 2.2 Add Datadog Webhook

Click "Add Webhook" and configure:

**Webhook Configuration:**
- **Webhook name**: `Datadog CI Visibility`
- **Receiver URL**: 
  ```
  https://webhook-intake.datadoghq.com/api/v2/webhook/?dd-api-key=<YOUR_DATADOG_API_KEY>
  ```
  **IMPORTANT**: Replace `<YOUR_DATADOG_API_KEY>` with your actual Datadog API key
  
- **Certificate verifications**: ✅ Enable this check
- **Events**: Select both:
  - ✅ Workflow Completed
  - ✅ Job Completed

### 2.3 Save Webhook

Click "Add Webhook" button to finish the configuration.

## Step 3: Test the Integration

### 3.1 Trigger a Pipeline

```bash
# Make a change to trigger the pipeline
cd /root/circleci-datadog-demo
echo "# Test change" >> README.md
git add README.md
git commit -m "Test: Trigger CircleCI pipeline"
git push
```

### 3.2 Monitor in CircleCI

1. Go to your CircleCI dashboard
2. Watch the pipeline execute
3. Verify all jobs complete successfully

### 3.3 Verify in Datadog

1. Log in to Datadog: https://app.datadoghq.com/
2. Navigate to **CI Visibility** → **Pipelines**
3. You should see your CircleCI pipeline data appearing
4. Check for:
   - Pipeline execution times
   - Job completion status
   - Workflow metrics

## Step 4: Additional Configuration (Optional)

### 4.1 Add Custom Tags

You can add custom tags to your CircleCI config to enhance Datadog visibility:

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/node:18.0
    environment:
      DD_ENV: production
      DD_SERVICE: circleci-demo
      DD_VERSION: 1.0.0
    steps:
      - checkout
      - run: echo "Building with custom tags..."
```

### 4.2 Add Custom Measures

Add performance metrics to your jobs:

```yaml
- run:
    name: Performance Test
    command: |
      START_TIME=$(date +%s)
      # Your command here
      END_TIME=$(date +%s)
      DURATION=$((END_TIME - START_TIME))
      echo "Duration: ${DURATION}s"
```

## Troubleshooting

### Webhook Not Receiving Data

1. **Verify API Key**: Ensure the API key is correct and active
2. **Check Events**: Confirm "Workflow Completed" and "Job Completed" are selected
3. **Certificate Verification**: Make sure it's enabled
4. **Test Webhook**: Use CircleCI's "Test Webhook" feature

### Data Not Appearing in Datadog

1. **Wait Time**: New pipeline results may take a few minutes to appear
2. **Historical Data**: Only new executions after setup are captured
3. **API Key Permissions**: Verify the API key has CI Visibility permissions
4. **Check Webhook Logs**: In CircleCI Project Settings → Webhooks, check delivery logs

### Pipeline Failures

1. Check CircleCI job logs for errors
2. Verify Docker images are accessible
3. Ensure all required dependencies are installed

## Project Structure

```
circleci-datadog-demo/
├── .circleci/
│   └── config.yml          # CircleCI pipeline configuration
├── index.js                # Sample Node.js application
├── package.json            # Node.js project metadata
└── README.md              # This file
```

## CircleCI Configuration Details

The `.circleci/config.yml` defines a simple workflow:

1. **Build Job**: Installs dependencies and builds the application
2. **Test Job**: Runs unit tests (requires build to complete)
3. **Deploy Job**: Deploys to staging (requires tests to pass, only on main branch)

## Datadog CI Visibility Features

Once configured, you'll have access to:

- **Pipeline Performance**: Execution times, success rates
- **Job Analytics**: Individual job metrics and trends
- **Failure Analysis**: Root cause analysis for failed pipelines
- **Custom Dashboards**: Create visualizations of your CI/CD metrics
- **Alerts**: Set up notifications for pipeline failures or performance degradation

## Security Best Practices

- **Never commit API keys** to your repository
- Store sensitive credentials in CircleCI environment variables or project settings
- Use Datadog's API key rotation feature regularly
- Limit API key permissions to only what's needed (CI Visibility)

## Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [Datadog CI Visibility Documentation](https://docs.datadoghq.com/continuous_integration/)
- [CircleCI Webhooks Guide](https://circleci.com/docs/webhooks/)

## Support

For issues or questions:
- CircleCI Support: https://support.circleci.com/
- Datadog Support: https://help.datadoghq.com/

---

**Created**: 2026-08-08
**Last Updated**: 2026-08-08
# Test: Trigger CircleCI pipeline - Sat Aug  8 10:06:06 AM PDT 2026
