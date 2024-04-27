import * as Bcrypt from 'bcrypt';
import * as Multer from 'multer';
import * as path from 'path'

const storageOptions =
    Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};




export class Utils {
    public MAX_TOKEN_TIME = 600000;
    public multer = Multer({ storage: storageOptions });
    public upload = Multer({ dest: './src/uploads/' });
    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        })
    }

    static async comparePassword(password: { plainPassword: string, encryptedPassword: string }): Promise<any> {
        return new Promise(((resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    reject(new Error('User and Password Does not Match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }

    static generateVerificationToken(size: number = 6) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();

        const paddedDay = day < 10 ? '0' + day : day;

        return `Get it by ${paddedDay} ${month}, ${year}`;
    };

    static calculateEndTime(durationString) {
        const durationParts = durationString.match(/\d+\s*[dhms]/g);

        console.log('Duration parts:', durationParts);
      
        if (!durationParts) {
          throw new Error('Invalid duration format');
        }
      
        let duration = 0;
        for (let i = 0; i < durationParts.length; i++) {
          const durationPart = durationParts[i];
          const match = durationPart.match(/(\d+)\s*([dhms])/);
          if (!match) {
            throw new Error('Invalid duration format');
          }
          const value = parseInt(match[1]);
          const unit = match[2];
      
          console.log('Value:', value);
          console.log('Unit:', unit);
      
          if (unit === 'd') {
            duration += value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
          } else if (unit === 'h') {
            duration += value * 60 * 60 * 1000; // Convert hours to milliseconds
          } else if (unit === 'm') {
            duration += value * 60 * 1000; // Convert minutes to milliseconds
          } else if (unit === 's') {
            duration += value * 1000; // Convert seconds to milliseconds
          }
        }
      
        const endTime = new Date(Date.now() + duration);
        return endTime;
    };
}