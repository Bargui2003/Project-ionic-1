import { Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private storage:Storage, private ToastController : ToastController) {
    this.initStorage();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  user ={
    username: '',
    email:'',
    password: '',
    dateOfBirth:'',
    gender: 'male',
  };
  async initStorage() {
    await this.storage.create();
  }
  registerUser(){
    this.storage.get('registeredUsers').then((data:any )=> {
      let registeredUsers = data || [];
      registeredUsers.push(this.user);
      this.storage.set('registeredUsers',registeredUsers).then(()=>{
        this.presentToast('Registration successfull ');
        this.user = {
          username:'',
          email:'',
          password: '',
          dateOfBirth:'',
          gender: 'male',
        }
      });
    });
    
  }
  afficher(){
    console.log(this.user)
  }
  async presentToast(message:string){
    const toast = await this.ToastController.create({
      message: message,
      duration: 3000,
      position :'bottom',
    });
    toast.present();
  }
}
