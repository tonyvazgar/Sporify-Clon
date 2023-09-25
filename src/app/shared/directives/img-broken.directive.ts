import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError(): void {
    const elNativo = this.elHost.nativeElement;
    console.log('Esta imagen no sirve -->', this.elHost)
    elNativo.src = 'https://www.google.es/url?sa=i&url=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3D4vq4Poo4tis&psig=AOvVaw0MhisLhQNVrOoETo9DJGDy&ust=1695702050413000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCOCDhcb0xIEDFQAAAAAdAAAAABAD';
  }
  @Input() customImg:string = '';
  constructor(private elHost: ElementRef) {
    console.log(elHost)
  }

}
