FROM mhart/alpine-node:11 AS builder
WORKDIR /
COPY . .
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /
COPY --from=builder /build .
CMD ["serve", "-p", "3001", "-s", "."]