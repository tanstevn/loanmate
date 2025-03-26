export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public emailAddress: string;
  public employmentStatus: string;
  public employerName?: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    employmentStatus: string,
    employerName?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.employmentStatus = employmentStatus;
    this.employerName = employerName;
  }
}
