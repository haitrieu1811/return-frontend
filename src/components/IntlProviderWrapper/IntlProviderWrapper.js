import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import * as selectors from '~/store/selectors';
import LanguageUtils from '~/utils/LanguageUtils';

const messages = LanguageUtils.getFlattenedMessages();

const IntlProviderWrapper = ({ children }) => {
    const language = useSelector(selectors.language);

    return (
        <IntlProvider locale={language} defaultLocale="vi" messages={messages[language]}>
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;
