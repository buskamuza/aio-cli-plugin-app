/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const utils = require('./app-helper')
const { buildActions } = require('@adobe/aio-lib-runtime')

/**
 * Builds actions.
 *
 * @param {object} config see src/lib/config-loader.js
 * @param {Array<string>} filterActions add filters to deploy only specified OpenWhisk actions
 */
module.exports = async (config, filterActions) => {
  utils.runScript(config.hooks['pre-app-build'])
  const script = await utils.runScript(config.hooks['build-actions'])
  if (!script) {
    console.log('calling build actions with', filterActions)
    await buildActions(config, filterActions)
  }
  utils.runScript(config.hooks['post-app-build'])
}
