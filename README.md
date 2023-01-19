# Numble 첼린지 - 신년 메세지 보내기 앱

## Demo

[링크](https://hny-vanilla-ts.vercel.app/)

## Stack

`language`

- Typescript

`bundler`

- Vite

`library`

- axios

`ci/cd`

- Vercel

## Pinpoint

```typescript
export default window.customElements.define(
  "hny-app",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        mounted: () => {
          store.$methods.getMessagesAll();

          new Router({
            routes: [
              {
                path: "/",
                component: HomePage,
              },
              {
                path: "/posting/:id",
                component: PostingPage,
              },
              {
                path: "/edit/:id",
                component: EditPage,
              },
              {
                path: "/create",
                component: CreatePage,
              },
              {
                path: "/*",
                component: NotFound,
              },
            ],
          });
        },
      });
    }
  }
);
```

웹 컴포넌트를 최대한 활용하여 제어역전을 통해 앱을 핸들링하고자 했습니다.
