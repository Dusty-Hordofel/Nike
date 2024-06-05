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

### 7. Banner variants

![Banner variants Demo](./public/website-demo/banner-variants.png "Banner Demo")

- create [Banner](src/components/ui/banner/Banner.tsx)

```tsx
import Link from "next/link";
import React from "react";
import BannerContent from "./BannerContent";
import { cn } from "@/lib/utils";
import BannerVideo from "./BannerVideo";
import BannerImage from "./BannerImage";

export type ImageProps = {
  mediaType: "image";
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export type VideoProps = {
  mediaType: "video";
  className?: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

export type NoMediaProps = {
  mediaType: "none";
};

export type CommonBannerProps = {
  href: string;
  title?: string;
  description?: string;
  links?: { label: string; href: string }[];
  descriptionClassName?: string;
  titleClassName?: string;
  bannerClassName?: string;
  contentPosition?: string;
  textAlign?: "text-start" | "text-center" | "text-end";
  linksAlign?: string;
  linksVariant?: "primary" | "secondary";
  linksSize?: "small" | "medium" | "large";
};

type BannerProps = CommonBannerProps & (ImageProps | VideoProps | NoMediaProps);

const Banner: React.FC<BannerProps> = (props) => {
  const hasContent =
    props.title ||
    (props.title && props.description) ||
    (props.title && props.description && props.links);

  return (
    <figure
      className={cn(
        "relative text-white h-full max-h-[518px]",
        props.bannerClassName
      )}
    >
      {props.mediaType === "image" ? (
        <Link href={props.href}>
          <BannerImage {...(props as ImageProps)} />
        </Link>
      ) : props.mediaType === "video" ? (
        <Link href={props.href}>
          <BannerVideo {...(props as VideoProps)} />
        </Link>
      ) : null}
      {hasContent && (
        <BannerContent
          {...(props as Omit<CommonBannerProps, "href" | "bannerClassName">)}
        />
      )}
    </figure>
  );
};

export default Banner;
```

- [BannerVideo](src/components/ui/banner/BannerVideo.tsx)

```tsx
import React from "react";
import { VideoProps } from "./Banner";
import { cn } from "@/lib/utils";

type BannerVideo = Omit<VideoProps, "mediaType">;

const BannerVideo = ({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  className,
  ...videoProps
}: BannerVideo) => {
  return (
    <video
      className={cn("max-h-[518px] w-full h-full  object-cover", className)}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      {...videoProps}
    />
  );
};

export default BannerVideo;
```

- [BannerImage](src/components/ui/banner/BannerImage.tsx)

```tsx
import React from "react";
import { ImageProps } from "./Banner";
import { cn } from "@/lib/utils";

type BannerImageProps = Omit<ImageProps, "mediaType">;

const BannerImage = ({
  src,
  alt,
  className,
  ...imgProps
}: BannerImageProps) => {
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        className={cn("max-h-[518px] w-full h-full object-cover", className)}
        {...imgProps}
      />
    </picture>
  );
};

export default BannerImage;
```

- [buttonLinks](src/components/ui/buttons/button-links/buttonLinks.tsx)

```tsx
import Link from "next/link";
import { buttonVariants } from "./buttons/button/button";
import { cn } from "@/lib/utils";

type ButtonLinkListProps = {
  links?: { label: string; href: string }[];
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  linksAlign?: string;
};

const buttonLinks = ({
  links,
  variant = "primary",
  size = "small",
  linksAlign = "justify-start",
}: ButtonLinkListProps) => {
  return (
    <div className={cn("flex items-center mt-[18px]", linksAlign)}>
      {links?.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          data-button-type="button"
          aria-label={link.label}
          className={cn(buttonVariants({ variant, size }), "font-medium")}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default buttonLinks;
```

- [using Banner](src/app/page.tsx)

```tsx
  <SmallDiscountBanner
        mediaType="image"
        src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1512,c_limit/340cfca0-c6d2-4748-ac2b-aa77dcfe44ad/nike-just-do-it.png"
        title="-25% sur tout le site"
        alt="Molongui"
        href="https://www.nike.com/fr/w/promotions-9dklk"
        contentPosition="absolute-center text-black-200 w-[90%]"
        titleClassName="text-2xl sm:text-3xl  md:text-[40px] min-[960px]:text-5xl"
        bannerClassName="h-[104px] bg-orange"
      />
      <DiscountBanner
        {...discountedItems}
        mediaType="image"
        contentPosition="absolute-center text-black-200 w-[90%]"
        titleClassName="text-2xl sm:text-3xl md:text-[40px] min-[960px]:text-5xl"
        bannerClassName="h-[250px]"
      />
      <DiscoverBanner
        mediaType="none"
        contentPosition="absolute-center w-[90%]"
        titleClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black-200 px-10"
        bannerClassName="h-[300px]"
        linksAlign="justify-center"
        {...discoverItems}
      />
      <ImageBanner
        mediaType="image"
        contentPosition="absolute-center w-[80%]"
        textAlign="text-center"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl  text-white"
        bannerClassName="h-[518px]"
        descriptionClassName="text-white"
        {...bannerImage}
      />
      <VideoBanner
        mediaType="video"
        contentPosition="bottom-left w-[80%]"
        textAlign="text-start"
        linksAlign="justify-start"
        linksVariant="secondary"
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white"
        descriptionClassName="text-white"
        bannerClassName="h-[518px]"
        {...bannerVideo}
      />
```

### 8. Carousel

- create [Carousel](src/components/ui/carousels/Carousel.tsx)

```ts
"use client";
import React, { useEffect, useRef, useState } from "react";
import CarouselControls from "./CarouselControls";
import CarouselSlides from "./CarouselSlides";
import { TrendSlidesProps } from "@/types/types";

interface CarousselProps {
  title?: string;
  data?: TrendSlidesProps[];
  slideClassName?: string;
  imageClassName?: string;
  carouselClassName?: string;
  children: (slide: TrendSlidesProps) => React.ReactNode; //
}

const Carousel = ({
  title,
  data,
  imageClassName,
  slideClassName,
  carouselClassName,

  children,
}: CarousselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const carouselRef = useRef<HTMLUListElement | null>(null);

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -469,
        behavior: "smooth",
      });
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 469, //457+12(slide width + margin right)
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const active = Math.round(scrollLeft / 469);
      setActiveIndex(active);
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft >= maxScrollLeft);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  console.log("🚀 ~ Carousel ~ data:", data);

  return (
    <section>
      <div className="flex justify-between items-center px-12 mb-3 pt-[2px] h-[56.398px]">
        <h2 className="text-2xl font-medium ">{title}</h2>
        <CarouselControls
          isAtStart={isAtStart}
          isAtEnd={isAtEnd}
          goToPreviousSlide={goToPreviousSlide}
          goToNextSlide={goToNextSlide}
        />
      </div>
      <CarouselSlides
        carouselRef={carouselRef}
        data={data}
        slideClassName={slideClassName}
        imageClassName={imageClassName}
        carouselClassName={carouselClassName}
      >
        {children}
      </CarouselSlides>
    </section>
  );
};

export default Carousel;

```

### 9. Navigation

- create [Navbar](src/components/navbar/Navbar.tsx)

```tsx
"use client";
import { CartIcon, FavorisIcon, NikeIcon } from "@/assets/icons";
import React, { useState } from "react";
import SearchInput from "./search/SearchInput";
import NavLinks from "./navigation/NavLinks";
import { menuLinks } from "@/assets/data/menuLinks";
import Link from "next/link";

const Navbar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <header className="relative z-10 max-w-[1920px] h-16 bg-white">
      <div className="grid grid-cols-12 px-12 h-full items-center overflow-hidden">
        <div className="col-span-2 h-full z-10">
          <span className="sr-only">Page d&lsquo;accueil Nike</span>
          <NikeIcon className="cursor-pointer hover:opacity-70 w-[60px] h-[60px]  scale-125 " />
        </div>

        <div className="col-span-7 h-full">
          <nav className="absolute inset-x-0 h-full ">
            <NavLinks menuLinks={menuLinks} />
          </nav>
        </div>
        <div className="col-span-3 h-full z-10 pt-3">
          <div className="float-right gap-1 flex h-[36px]">
            <search aria-label="Rechercher des articles Nikes">
              <SearchInput />
            </search>

            {!expand && (
              <>
                <Link className="link-icon-hover" href="#">
                  <FavorisIcon aria-label="Favoris" />
                </Link>
                <Link className="link-icon-hover" href="#">
                  <CartIcon aria-label="Articles du panier: 0" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
```

### 10.

```tsx

```

## External Links

- 🔗 [Nextjs](https://nextjs.org/docs/getting-started/installation)
- 🔗 [Shadcn](https://ui.shadcn.com/docs/installation/next)
- 🔗 [Storybook](https://storybook.js.org/docs/get-started/nextjs)
- 🔗 [Playwright](https://playwright.dev/docs/intro)
- 🔗 [Testing-library](https://nextjs.org/docs/pages/building-your-application/testing/jest)
