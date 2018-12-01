import * as Control from "Core/Control";
import template = require('wml!EDM/Document/Document');
import createGUID = require("Core/helpers/createGUID");
import LocalStorage from 'EDM/LocalStorage/Source';
import * as Memory from  'WS.Data/Source/Memory';
import 'css!EDM/Document/DocumentStyles'

class Document extends Control {
   public _template: Function = template;
   private  _id: String = "";
   private _author: String = "";
   private _title: String = "";
   private _description: String = "";
   private _date: String = "";
   private _time: String = "";
   private _style: String = "1";
   private _items: Object={};
   public _memorySource: Memory;
   readOnly: Boolean = true;
   dateTime: Boolean = true;

   _beforeMount(options:Object): void {
      this.dateTime = false;
      this._memorySource = new Memory({
         idProperty: 'title',
         data: [
            { id: '1', title: 'default' },
            { id: '2', title: 'cars' },
            { id: '3', title: 'cats' }
         ]
      });
      this._id = options.item ? options.item.id : createGUID();
      this._author = options.item ? options.item.author : "";
      this._title = options.item ? options.item.title : "";
      this._description = options.item ? options.item.description: "";
      this.readOnly = options.readOnly ? options.readOnly : false;
      this._style = options.item ? options.item.style : "1";
      this.dateTime = true;

      var date =  new Date();
      var month = 1 + date.getMonth();
      var minute =  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      this._date = options.item ? options.item.date : date.getDate() + "." + month + "." + date.getFullYear();
      this._time = options.item ? options.item.time : date.getHours() + ":" + minute;
   }

   public save(): void {

      var date =  new Date();
      var month = 1 + date.getMonth();
      var minute =  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      this._date = date.getDate() + "." + month + "." + date.getFullYear();
      this._time = date.getHours() + ":" + minute;

      LocalStorage.update(this._id, {
         id: this._id,
         author: this._author,
         title: this._title,
         date: this._date,
         time: this._time,
         description: this._description,
         style: this._style
      });

      this._notify('sendResult', []);
      this._notify('close', [], {bubbling: true});
   }

   public edit(): void {
      this.dateTime = false;
      this.readOnly = false;

   }

   _valueChangedHandler(e:Event, tmp:Object) {
         if (!tmp) {
            this._notify('valueChanged', undefined);
         } else {
            this._notify('valueChanged', [tmp]);
         }
      }
}

export = Document;
