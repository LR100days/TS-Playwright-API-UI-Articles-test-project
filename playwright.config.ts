import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
//require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  reporter: [['html'],['list']],
  use: {
    trace: 'retain-on-failure',
    launchOptions: {
      args: ["--start-maximized"],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-testing',
      testDir: './tests',
      testMatch: 'example*',
      dependencies: ['smoke-tests']
    },

    {
      name: 'smoke-tests',
      testDir: './tests/API-tests',
    },

    {
      name: 'ui-e2etest-in-chromium',
      testDir: './tests/UI-tests',
      use: {
      viewport: null}
    },

  ],


});
