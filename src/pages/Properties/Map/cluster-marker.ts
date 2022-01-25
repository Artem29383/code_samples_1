/* eslint-disable */

type ClusterStyle = {
  size: number;
  fontSize: number;
  borderWidth: number;
};

type Icon = { src: string; size: number };

export interface ClusterMarkerInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  title: string;
  anchorElement?: HTMLDivElement;
  style: ClusterStyle;
  icon: Icon | null;
}

export default () =>
  class ClusterMarker extends google.maps.OverlayView {
    position: google.maps.LatLng;
    title: string;
    anchorElement?: HTMLDivElement;
    clusterElement?: HTMLDivElement;
    iconElement?: HTMLImageElement;
    bgElement?: HTMLDivElement;
    style: ClusterStyle;
    icon: Icon | null;

    constructor(
      position: google.maps.LatLng,
      title: string,
      style: ClusterStyle,
      icon: Icon | null
    ) {
      super();

      this.position = position;
      this.title = title;
      this.style = style;
      this.icon = icon;
    }

    onAdd() {
      this.anchorElement = document.createElement('div');
      this.clusterElement = document.createElement('div');
      this.bgElement = document.createElement('div');

      this.bgElement.classList.add('map-cluster-bg');
      this.anchorElement.classList.add('map-cluster-anchor');
      this.clusterElement.classList.add('map-cluster');

      this.clusterElement.textContent = this.title;

      if (this.icon) {
        this.iconElement = document.createElement('img');
        this.iconElement.classList.add('map-cluster-heart');
        this.iconElement.src = this.icon.src;
        this.clusterElement.appendChild(this.iconElement);
      }

      this.anchorElement.appendChild(this.bgElement);
      this.anchorElement.appendChild(this.clusterElement);

      var that = this;

      google.maps.event.addDomListener(this.anchorElement, 'click', function() {
        google.maps.event.trigger(that, 'click');
      });

      this.getPanes()!.overlayMouseTarget.appendChild(this.anchorElement);
    }

    getElement() {
      return this.clusterElement;
    }

    onRemove() {
      if (this.anchorElement) {
        (this.anchorElement.parentNode as HTMLElement).removeChild(
          this.anchorElement
        );
        delete this.anchorElement;
      }
    }

    draw() {
      const overlayProjection = this.getProjection();

      const sw = overlayProjection.fromLatLngToDivPixel(this.position)!;
      const ne = overlayProjection.fromLatLngToDivPixel(this.position)!;

      if (this.anchorElement && this.clusterElement && this.bgElement) {
        this.anchorElement.style.left = `${sw.x}px`;
        this.anchorElement.style.top = `${ne.y}px`;

        this.clusterElement.style.top = `${-this.style.size / 2}px`;
        this.clusterElement.style.left = `${-this.style.size / 2}px`;
        this.clusterElement.style.width = `${this.style.size}px`;
        this.clusterElement.style.height = `${this.style.size}px`;
        this.clusterElement.style.fontSize = `${this.style.fontSize}px`;

        this.bgElement.style.width = `${this.style.borderWidth}px`;
        this.bgElement.style.height = `${this.style.borderWidth}px`;
      }

      if (this.icon && this.iconElement) {
        this.iconElement.style.width = `${this.icon.size}px`;
        this.iconElement.style.height = `${this.icon.size}px`;
      }
    }
  };
