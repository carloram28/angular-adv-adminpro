import { Component, OnDestroy } from '@angular/core';
import {Router,ActivationEnd, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import {filter, map} from 'rxjs/operators'
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string | undefined;
  public tituloSubs$: Subscription;


  constructor( private router: Router, private route: ActivatedRoute ) {

    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe( ({ titulo }) => {
                            this.titulo = titulo;
                            document.title = `AdminPro - ${ titulo }`;
                        });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

    getArgumentosRuta(){
      return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd && event.snapshot.firstChild === null),

      map( (event:any) => event.snapshot.data as any),

     )

    }



}
