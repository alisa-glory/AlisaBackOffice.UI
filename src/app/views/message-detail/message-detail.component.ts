import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageTransaction } from 'src/app/models/messages-transaction';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  public messageTrans: MessageTransaction | any

  // myForm = this.fb.group({
  //   id: [''],
  //   userId: [''],
  //   messageText: [''],
  // });

  constructor(private route: ActivatedRoute, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("MessageDetailComponent ngOnInit");
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const messageIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
    this.getMessage(messageIdFromRoute);    
    // if (this.messageTrans) {
    //   this.myForm.controls['id'].setValue(this.messageTrans.id);
    //   this.myForm.controls['userId'].setValue(this.messageTrans.userId);
    //   this.myForm.controls['messageText'].setValue(this.messageTrans.messageText);
    // }
  }

  getMessage(id: number) {
    return this.messageService.getMessage(id).subscribe({
      next: (res) => {
        this.messageTrans = res;
        this.messageTrans.prompt.replace("\n", "<br>")
        console.log(this.messageTrans);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
