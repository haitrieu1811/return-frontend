import { Buffer } from 'buffer';
import { useIntl } from 'react-intl';

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
        const intl = useIntl();
        const yearTxt = intl.formatMessage({ id: 'time.year' });
        const monthTxt = intl.formatMessage({ id: 'time.month' });
        const weekTxt = intl.formatMessage({ id: 'time.week' });
        const dayTxt = intl.formatMessage({ id: 'time.day' });
        const hourTxt = intl.formatMessage({ id: 'time.hour' });
        const minuteTxt = intl.formatMessage({ id: 'time.minute' });
        const secondTxt = intl.formatMessage({ id: 'time.second' });

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;
        if (interval > 1) {
            return `${Math.floor(interval)} ${yearTxt}`;
        }

        interval = seconds / 2592000;
        if (interval > 1) {
            return `${Math.floor(interval)} ${monthTxt}`;
        }

        interval = seconds / 604800;
        if (interval > 1) {
            return `${Math.floor(interval)} ${weekTxt}`;
        }

        interval = seconds / 86400;
        if (interval > 1) {
            return `${Math.floor(interval)} ${dayTxt}`;
        }

        interval = seconds / 3600;
        if (interval > 1) {
            return `${Math.floor(interval)} ${hourTxt}`;
        }

        interval = seconds / 60;
        if (interval > 1) {
            return `${Math.floor(interval)} ${minuteTxt}`;
        }

        return `${Math.floor(interval)} ${secondTxt}`;
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
