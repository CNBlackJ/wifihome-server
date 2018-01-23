'use strict';

const egg = require('egg');
const cluster = require('cluster');

const workers = 1; // Number(process.argv[2] || require('os').cpus().length);

egg.startCluster({
  workers,
  baseDir: __dirname,
});
for (let i = 0; i < workers; i++) {
  cluster.fork();
}
