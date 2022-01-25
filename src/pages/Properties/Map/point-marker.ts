/* eslint-disable */

export interface PointMarkerInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  icon: string;
  id: number;
  setIcon: (icon: string, size: [number, number]) => void;
}

export default () =>
  class PointMarker extends google.maps.OverlayView {
    id: number;
    element?: HTMLDivElement;
    position: google.maps.LatLng;
    icon: string;
    size: [number, number];

    constructor(
      id: number,
      position: google.maps.LatLng,
      icon: string,
      size: [number, number]
    ) {
      super();

      this.icon = icon;
      this.position = position;
      this.size = size;
      this.id = id;
    }

    setIcon(icon: string, size: [number, number]) {
      this.size = size;
      const iconEl = this.element!.querySelector('img')!;
      iconEl.src = icon;

      this.draw();
    }

    onAdd() {
      this.element = document.createElement('div') as HTMLDivElement;

      const image = document.createElement('img') as HTMLImageElement;
      image.src = this.icon;

      this.element.appendChild(image);
      this.element.classList.add('map-point-anchor');

      var that = this;

      google.maps.event.addDomListener(this.element, 'click', function() {
        google.maps.event.trigger(that, 'click');
      });

      this.getPanes()!.overlayMouseTarget.appendChild(this.element);
    }

    onRemove() {
      if (this.element) {
        (this.element.parentNode as HTMLElement).removeChild(this.element);
        delete this.element;
      }
    }

    draw() {
      const overlayProjection = this.getProjection();

      const sw = overlayProjection.fromLatLngToDivPixel(this.position)!;
      const ne = overlayProjection.fromLatLngToDivPixel(this.position)!;

      if (this.element) {
        this.element.style.left = `${sw.x}px`;
        this.element.style.top = `${ne.y}px`;
        this.element.querySelector('img')!.style.top = `${-this.size[1]}px`;
        this.element.querySelector('img')!.style.left = `${-this.size[0] /
          2}px`;
      }
    }
  };
