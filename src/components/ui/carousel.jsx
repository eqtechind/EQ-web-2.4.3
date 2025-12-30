"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const Carousel = React.forwardRef(({ className, opts, setApi, ...props }, ref) => {
  const [api, setCarouselApi] = React.useState()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  React.useEffect(() => {
    if (setApi) {
      setApi(api)
    }
  }, [api, setApi])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      <div className="overflow-hidden">
        <div className="flex">
          {React.Children.map(props.children, (child) => {
            if (React.isValidElement(child) && child.type === CarouselContent) {
              return React.cloneElement(child, { api })
            }
            return child
          })}
        </div>
      </div>
    </div>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, api, ...props }, ref) => {
  const [carouselRef, setCarouselRef] = React.useState()
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  React.useEffect(() => {
    if (!carouselRef) {
      return
    }

    const updateScrollButtons = () => {
      if (api) {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }
    }

    updateScrollButtons()
    api?.on("select", updateScrollButtons)
    api?.on("reInit", updateScrollButtons)

    return () => {
      api?.off("select", updateScrollButtons)
      api?.off("reInit", updateScrollButtons)
    }
  }, [api, carouselRef])

  return (
    <div ref={setCarouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous slide</span>
  </button>
))
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next slide</span>
  </button>
))
CarouselNext.displayName = "CarouselNext"

const CarouselPagination = React.forwardRef(({ 
  className, 
  numSlides, 
  currentSlide, 
  onPaginationClick, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex justify-center space-x-2 mt-4", className)}
      {...props}
    >
      {Array.from({ length: numSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onPaginationClick?.(index)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            currentSlide === index
              ? "bg-primary"
              : "bg-muted"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
})
CarouselPagination.displayName = "CarouselPagination"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
}
