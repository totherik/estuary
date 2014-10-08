sluice
======

ZeroMQ GitHub Event Publisher.

```bash
$ npm i -g sluice
$ sluice -a "tcp://127.0.0.1:12345"
```


#### Options

- `a`, `address` (optional) - Address on which publisher should bind. Defaults to env variable `ZEROMQ_SOCKET_ADDRESS` or 'tcp://127.0.0.1:12345'
- `t`, `token` (optional) - GitHub auth token. Defaults to env variable `GITHUB_TOKEN` or unset.
- `u`, `url` (optional) - GitHub Event API URL. Defaults to env variable `GITHUB_EVENT_URL` or 'https://api.github.com/events'.
- `i`, `identity` (optional) - Subscriber identity. Optionally includes process pid. Defaults to env variable `ZEROMQ_SOCKET_IDENTITY` or 'github-event-publisher-%d'.
- `e`, `event_id` (optional) - Starting GitHub event id. Defaults to env variable `GITHUB_EVENT_ID` or unset.
