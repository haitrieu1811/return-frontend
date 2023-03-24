import { Buffer } from 'buffer';

class CommonUtils {
    static getBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (e) => reject(e);
        });
    };

    static timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + ' năm';
        }

        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + ' tháng';
        }

        interval = seconds / 604800;
        if (interval > 1) {
            return Math.floor(interval) + ' tuần';
        }

        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + ' ngày';
        }

        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + ' giờ';
        }

        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + ' phút';
        }

        return Math.floor(seconds) + ' giây';
    };

    static intToString = (number) => {
        const ranges = [
            {
                divider: 1e3,
                suffix: 'K',
            },
            {
                divider: 1e6,
                suffix: 'M',
            },
            {
                divider: 1e9,
                suffix: 'B',
            },
        ];

        for (let index = ranges.length - 1; index >= 0; index--) {
            if (number > ranges[index].divider) {
                let quotient = number / ranges[index].divider;

                if (quotient < 10) {
                    quotient = Math.floor(quotient * 10) / 10;
                } else {
                    quotient = Math.floor(quotient);
                }

                return quotient.toString() + ranges[index].suffix;
            }
        }

        return number.toString();
    };

    static renderImage = (image) => {
        return new Buffer(image, 'base64').toString('binary');
    };
}

export default CommonUtils;
