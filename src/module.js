import { join } from "path";
import consola from "consola";

export default async function blokModule({ prefix = '' } = {}) {
  const logger = consola.withScope("@blokwise/blok");

  await this.requireModule('@blokwise/dynamic')

  this.nuxt.hook("components:dirs", (dirs) => {
    dirs.push({
      path: join(__dirname, "components"),
      pattern: "**/*.vue",
      prefix,
    });
  });

  logger.success({
    message: "blok component ready",
    additional: `Module @blokwise/blok successfully initialized.\nReady to hydrate components based on storyblok blok schemes\n\nThis allows the developer to load components detected by @nuxt/components lazily as dynamic components.\nRead docs: https://blok.blokwise.io`,
    badge: true,
  });

  return true;
}

module.exports.meta = require("./../package.json");
