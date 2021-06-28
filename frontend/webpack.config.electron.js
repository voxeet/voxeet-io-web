const commonConfig = require("./webpack.config.electron.common");

const enableTelemetry = true;

const getConfig = environment => {
  switch (environment) {
    default:
    case "production":
      return {
        asset_path: "./",
        auth_server: "https://voxeet.io",
        environment: environment
      };
    case "staging":
      return {
        asset_path: "./",
        auth_server: "https://staging.voxeet.io",
        environment: environment
      };
  }
};

module.exports = env => {
  // 1- check process.env.NODE_ENV for variable environment (should be the case while using gitlab.yaml)
  // 2- check env function parameter env for variable environment (use --env=production in npm scripts)
  // 3- if not yet defined in two preview steps, then use production as default.
  const currentEnvironment = process.env.NODE_ENV || env;

  const selectedEnv = ["production", "staging"];
  const environment = selectedEnv.includes(currentEnvironment)
    ? currentEnvironment
    : "production";

  const config = getConfig(environment);
  console.log("Configuration:", JSON.stringify(config));
  return commonConfig(config);
};
