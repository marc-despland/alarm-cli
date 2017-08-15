
export class Image {
	imageid: string;
	length: number;
    contentType: string;
    filename: string;
    md5: string;
    uploadDate: string;
    url:string;
    thumbnail:string;
	
	constructor() {
		this.imageid="";
		this.length=0;
		this.contentType="";
		this.filename="";
		this.md5="";
		this.uploadDate="";
		this.url="";
		this.thumbnail="";
	}
}
