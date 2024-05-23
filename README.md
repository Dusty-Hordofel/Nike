# 👟 Nike-Clone - An eCommerce Website Clone

### Author Links

👋 Hello, I'm Hordofel Dusty BAMANA.

👇 Follow Me:

- [Twitter](https://twitter.com/hordofel)
- [LinkedIn](https://www.linkedin.com/in/dusty-hordofel-bamana-08389310a)

---

## Demo

## ![Nike-Clone Desktop Demo](./public/website-demo/website-demo-1.png "Desktop Demo")

### 🚀 Description

---

Welcome to the captivating world of Nike-Clone, where performance and style converge to create an unparalleled experience in fashion and sports innovation. This e-commerce website, beautifully designed by Dusty Hordofel, opens the doors to a haven for sports enthusiasts, passionate athletes, and urban fashion aficionados.

Discover an extensive selection of products that embody the bold spirit and relentless pursuit of excellence, thanks to the talent of Dusty Hordofel. Browse through our diverse range of iconic shoes, from the legendary Air Max to cutting-edge running shoes, engineered to propel your performance to new heights. Our collection of sportswear and streetwear seamlessly blends comfort and style, allowing you to express yourself while staying on the cutting edge of trends.

At Nike-Clone, innovation is our driving force. Explore our cutting-edge technologies, such as React foam for responsive cushioning, or Dri-FIT fabric that wicks away sweat to keep you cool and dry during your most intense workouts. Each product we offer, crafted through Dusty Hordofel's creativity, is the result of meticulous research and a commitment to excellence.

This e-commerce website is more than just a showcase of products. It embodies a lifestyle, showcasing Dusty Hordofel's exceptional skills in web and mobile development. By choosing this website, you embark on a seamless and inspiring online experience, where each click reveals Dusty Hordofel's expertise. You become part of a community that values authenticity, performance, and positive impact.

Navigate through this exceptional website, passionately created by Dusty Hordofel, and discover a unique online shopping experience. Dusty Hordofel and his expertise accompany you every step of the way on this e-commerce journey.

Join us today and embrace the power of the "Swoosh." Welcome to the exciting world of Nike-Clone, reimagined by Dusty Hordofel, where sports meet style and every interaction is a celebration of exceptional skills.

Just Do It™.

Dusty Hordofel
Creator and Web & Mobile Developer

---

## Section 1: Folder Structure

### 1. Define a project folder structure

- create `Nike` Project Using [Nextjs](https://nextjs.org/docs/getting-started/installation) with `App Router`

```bash
$ npx create-next-app@latest
```

✅ What is your project named? Nike-Clone <br/>
Would you like to use TypeScript? No / **Yes** <br/>
✅ Would you like to use ESLint? No / **Yes** <br/>
✅ Would you like to use Tailwind CSS? No / **Yes** <br/>
✅ Would you like to use `src/` directory? No / **Yes** <br/>
✅ Would you like to use App Router? (recommended) No / **Yes** <br/>
✅ Would you like to customize the default import alias? No / **Yes** <br/>
✅ What import alias would you like configured? **@/\***

### 2. Shadcn

- add [Shadcn](https://ui.shadcn.com/docs/installation/next) and [Button](https://ui.shadcn.com/docs/components/button)

```bash
$ npx shadcn-ui@latest init
$ npx shadcn-ui@latest add button
```

### 3. Storybook

- add [Storybook](https://storybook.js.org/docs/get-started/nextjs) and `run it`

```bash
$ npx storybook@latest init
$ npm run storybook
```

### 4. Playwright and testing-library

- add [Playwright](https://playwright.dev/docs/intro) and run [example test](tests/example.spec.ts)

```bash
$ npm init playwright@latest
$ npx playwright test
```

- add [testing-library](https://nextjs.org/docs/pages/building-your-application/testing/jest)

```bash
$ npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
$ npm init jest@latest
$ npm i --save-dev @types/jest
$ npm i -D ts-node
```

- configure [jest.config.ts](jest.config.ts)

```ts
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

- add [jest.setup.ts](jest.setup.ts)

```ts
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
```

- add a test to check if the <Home /> component [successfully renders a heading](__tests__/home.test.tsx)

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
```

```tsx
import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
```

- run test `npm run test`

```bash
> nike@0.1.0 test
> jest

PASS **tests**/home.test.tsx
Home
✓ renders a heading (34 ms)

Test Suites: 1 passed, 1 total
Tests: 1 passed, 1 total
Snapshots: 0 total
Time: 0.751 s
Ran all test suites.
```

## Section 2: Components

### 5. Nike Colors and Fonts

- add [Nike Colors](tailwind.config.ts)
- add [Helvetica font](src/assets/fonts/helvetica/helvetica.ts)
- add [nike font](src/assets/fonts/nike/nike.ts)

### 6. Buttons

- create [ArrowButton](src/components/ui/buttons/arrow-button/arrow-button.tsx)
- create [Button](src/components/ui/buttons/button/button.tsx)

### 7.

### 8.

### 9.

### 10.

## External Links

- 🔗 [Nextjs](https://nextjs.org/docs/getting-started/installation)
- 🔗 [Shadcn](https://ui.shadcn.com/docs/installation/next)
- 🔗 [Storybook](https://storybook.js.org/docs/get-started/nextjs)
- 🔗 [Playwright](https://playwright.dev/docs/intro)
- 🔗 [Testing-library](https://nextjs.org/docs/pages/building-your-application/testing/jest)
