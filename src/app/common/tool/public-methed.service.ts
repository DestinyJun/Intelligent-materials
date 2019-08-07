import { Injectable } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PublicMethedService {

  private cleanTimer: any;
  private dataList: any[] =[];
  private dataName = null;
  public esDate = {
    firstDayOfWeek: 0,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清除'
  };
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
  // set Toast
  public setToast(type, title, message): void {
    if (this.cleanTimer) {
      clearTimeout(this.cleanTimer);
    }
    this.messageService.clear();
    this.messageService.add({severity: type, summary: title, detail: message});
    this.cleanTimer = setTimeout(() => {
      this.messageService.clear();
    }, 3000);
  }
  // set Toast
  public  setQuestJudgment(status, message, callback: (...args: any[]) => any): void {
       if (status === '1000') {
         this.setToast('success', '操作成功', message);
         callback();
       } else {
         this.setToast('error', '操作失败', message);
       }
  }
  /**
   * Setting prompt box
   * @param title
   * @param message
   * @param callback
   */
  public  setConfirmation(title, message, callback: (...args: any[]) => any): void {
    this.confirmationService.confirm({
      message: `确认要${message}吗？`,
      header: `${title}` + `提醒`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        callback();
      },
      reject: () => {
      }
    });
  }
}
