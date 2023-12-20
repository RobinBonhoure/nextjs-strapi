"use client";
import { useRef, useEffect } from "react";

interface Props {
  data: {
    text: string;
    separator: string;
  }
}

const RailText: React.FC<Props> = ({ data }) => {
  const numberOfRail = 4;
  const divRef = useRef<HTMLDivElement | null>(null);

  function lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
  }

  useEffect(() => {
    const wrapper = divRef.current;
    if (!wrapper) return;

    const railContainer = wrapper.querySelector(".blocks-rail_group-container") as HTMLElement;
    const trackContainers = wrapper.querySelector(".blocks-rail_track-container") as HTMLElement;
    const trackContainersWidth = trackContainers.offsetWidth;
    const resetFrame = -Math.abs(trackContainersWidth);

    let initialPosition = resetFrame;
    let translateValue = initialPosition;
    let initialSpeed = 2;
    let acceleration = 1;
    let speed = initialSpeed;
    let customDirectionScroll = 1;
    let directionScroll = 1;
    let scrollDistance = window.scrollY;

    function scrollRail() {
      translateValue -= Math.sign(directionScroll) * speed;
      railContainer.style.transform = `translate3d(${translateValue}px, 0, 0)`;

      if (translateValue <= resetFrame * 2 || translateValue >= 0) {
        translateValue = initialPosition;
        speed = initialSpeed;
      }

      speed = lerp(speed, initialSpeed, 0.1);

      requestAnimationFrame(() => scrollRail());
    }

    scrollRail();

    function handleScroll() {
      const scrollValue = window.scrollY;
      const distance = scrollValue - scrollDistance;
      const distanceAbs = Math.abs(distance);
      directionScroll = Math.sign(distance) * Math.sign(customDirectionScroll);
      acceleration = Math.sqrt(distanceAbs) || 0;
      speed = lerp(speed, speed * acceleration, 0.1);
      speed = Math.min(Math.max(speed, -10), 10);
      scrollDistance = scrollValue;
    }

    let isDragging = false;
    let startDragX = 0;

    function handleMouseDown(e: globalThis.MouseEvent) {
      isDragging = true;
      startDragX = e.clientX;
    }

    function handleMouseMove(e: globalThis.MouseEvent) {
      if (!isDragging) return;
      const dx = startDragX - e.clientX;
      directionScroll = Math.sign(dx);
      translateValue -= dx;
      startDragX = e.clientX;
    }

    function handleMouseUp() {
      isDragging = false;
    }

    function handleTouchStart(e: globalThis.TouchEvent) {
      isDragging = true;
      startDragX = e.touches[0].clientX;
    }

    function handleTouchMove(e: globalThis.TouchEvent) {
      if (!isDragging) return;
      const dx = startDragX - e.touches[0].clientX;
      directionScroll = Math.sign(dx);
      translateValue -= dx;
      startDragX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
      isDragging = false;
    }

    window.addEventListener("scroll", handleScroll);
    wrapper.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    wrapper.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      wrapper.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <section ref={divRef} className={`blocks-rail_wrapper`}>
      <div className="blocks-rail_group-container">
        {[...Array(numberOfRail)].map((_, index) => (
          <div key={index} className="blocks-rail_track-container">
            <div className="blocks-rail_track">
              <div className="blocks-rail_item">
                {data.text}
                <span>{data.separator}</span>
              </div>
            </div>
            <div className="blocks-rail_track">
              <div className="blocks-rail_item">
                {data.text}
                <span>{data.separator}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RailText;
