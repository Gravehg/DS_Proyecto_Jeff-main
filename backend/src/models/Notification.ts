class Notification {
  private notificationId: string;
  private userId: string;
  private date: Date;
  private title: string;
  private content: string;

  constructor(
    date: Date,
    title: string,
    content: string,
    userId: string,
    notificationId?: string
  ) {
    this.date = date;
    this.title = title;
    this.content = content;
    this.userId = userId
    this.notificationId = notificationId;
  }

  public setNotificationId(notificationId: string) {
    this.notificationId = notificationId;
  }

  public getNotificationId() {
    return this.notificationId;
  }

  public getDate() {
    return this.date;
  }

  public getTitle() {
    return this.title;
  }

  public getContent() {
    return this.content;
  }

  public getUserId(){
    return this.userId;
  }
}

export { Notification };
