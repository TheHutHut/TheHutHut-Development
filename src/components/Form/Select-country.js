/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
    { code: 'AD', title: 'Andorra', countryCallingCode: '376' },
    {
        code: 'AE',
        title: 'United Arab Emirates',
        countryCallingCode: '971',
    },
    { code: 'AF', title: 'Afghanistan', countryCallingCode: '93' },
    {
        code: 'AG',
        title: 'Antigua and Barbuda',
        countryCallingCode: '1-268',
    },
    { code: 'AI', title: 'Anguilla', countryCallingCode: '1-264' },
    { code: 'AL', title: 'Albania', countryCallingCode: '355' },
    { code: 'AM', title: 'Armenia', countryCallingCode: '374' },
    { code: 'AO', title: 'Angola', countryCallingCode: '244' },
    { code: 'AQ', title: 'Antarctica', countryCallingCode: '672' },
    { code: 'AR', title: 'Argentina', countryCallingCode: '54' },
    { code: 'AS', title: 'American Samoa', countryCallingCode: '1-684' },
    { code: 'AT', title: 'Austria', countryCallingCode: '43' },
    {
        code: 'AU',
        title: 'Australia',
        countryCallingCode: '61',
        suggested: true,
    },
    { code: 'AW', title: 'Aruba', countryCallingCode: '297' },
    { code: 'AX', title: 'Alland Islands', countryCallingCode: '358' },
    { code: 'AZ', title: 'Azerbaijan', countryCallingCode: '994' },
    {
        code: 'BA',
        title: 'Bosnia and Herzegovina',
        countryCallingCode: '387',
    },
    { code: 'BB', title: 'Barbados', countryCallingCode: '1-246' },
    { code: 'BD', title: 'Bangladesh', countryCallingCode: '880' },
    { code: 'BE', title: 'Belgium', countryCallingCode: '32' },
    { code: 'BF', title: 'Burkina Faso', countryCallingCode: '226' },
    { code: 'BG', title: 'Bulgaria', countryCallingCode: '359' },
    { code: 'BH', title: 'Bahrain', countryCallingCode: '973' },
    { code: 'BI', title: 'Burundi', countryCallingCode: '257' },
    { code: 'BJ', title: 'Benin', countryCallingCode: '229' },
    { code: 'BL', title: 'Saint Barthelemy', countryCallingCode: '590' },
    { code: 'BM', title: 'Bermuda', countryCallingCode: '1-441' },
    { code: 'BN', title: 'Brunei Darussalam', countryCallingCode: '673' },
    { code: 'BO', title: 'Bolivia', countryCallingCode: '591' },
    { code: 'BR', title: 'Brazil', countryCallingCode: '55' },
    { code: 'BS', title: 'Bahamas', countryCallingCode: '1-242' },
    { code: 'BT', title: 'Bhutan', countryCallingCode: '975' },
    { code: 'BV', title: 'Bouvet Island', countryCallingCode: '47' },
    { code: 'BW', title: 'Botswana', countryCallingCode: '267' },
    { code: 'BY', title: 'Belarus', countryCallingCode: '375' },
    { code: 'BZ', title: 'Belize', countryCallingCode: '501' },
    {
        code: 'CA',
        title: 'Canada',
        countryCallingCode: '1',
        suggested: true,
    },
    {
        code: 'CC',
        title: 'Cocos (Keeling) Islands',
        countryCallingCode: '61',
    },
    {
        code: 'CD',
        title: 'Congo, Democratic Republic of the',
        countryCallingCode: '243',
    },
    {
        code: 'CF',
        title: 'Central African Republic',
        countryCallingCode: '236',
    },
    {
        code: 'CG',
        title: 'Congo, Republic of the',
        countryCallingCode: '242',
    },
    { code: 'CH', title: 'Switzerland', countryCallingCode: '41' },
    { code: 'CI', title: "Cote d'Ivoire", countryCallingCode: '225' },
    { code: 'CK', title: 'Cook Islands', countryCallingCode: '682' },
    { code: 'CL', title: 'Chile', countryCallingCode: '56' },
    { code: 'CM', title: 'Cameroon', countryCallingCode: '237' },
    { code: 'CN', title: 'China', countryCallingCode: '86' },
    { code: 'CO', title: 'Colombia', countryCallingCode: '57' },
    { code: 'CR', title: 'Costa Rica', countryCallingCode: '506' },
    { code: 'CU', title: 'Cuba', countryCallingCode: '53' },
    { code: 'CV', title: 'Cape Verde', countryCallingCode: '238' },
    { code: 'CW', title: 'Curacao', countryCallingCode: '599' },
    { code: 'CX', title: 'Christmas Island', countryCallingCode: '61' },
    { code: 'CY', title: 'Cyprus', countryCallingCode: '357' },
    { code: 'CZ', title: 'Czech Republic', countryCallingCode: '420' },
    {
        code: 'DE',
        title: 'Germany',
        countryCallingCode: '49',
        suggested: true,
    },
    { code: 'DJ', title: 'Djibouti', countryCallingCode: '253' },
    { code: 'DK', title: 'Denmark', countryCallingCode: '45' },
    { code: 'DM', title: 'Dominica', countryCallingCode: '1-767' },
    {
        code: 'DO',
        title: 'Dominican Republic',
        countryCallingCode: '1-809',
    },
    { code: 'DZ', title: 'Algeria', countryCallingCode: '213' },
    { code: 'EC', title: 'Ecuador', countryCallingCode: '593' },
    { code: 'EE', title: 'Estonia', countryCallingCode: '372' },
    { code: 'EG', title: 'Egypt', countryCallingCode: '20' },
    { code: 'EH', title: 'Western Sahara', countryCallingCode: '212' },
    { code: 'ER', title: 'Eritrea', countryCallingCode: '291' },
    { code: 'ES', title: 'Spain', countryCallingCode: '34' },
    { code: 'ET', title: 'Ethiopia', countryCallingCode: '251' },
    { code: 'FI', title: 'Finland', countryCallingCode: '358' },
    { code: 'FJ', title: 'Fiji', countryCallingCode: '679' },
    {
        code: 'FK',
        title: 'Falkland Islands (Malvinas)',
        countryCallingCode: '500',
    },
    {
        code: 'FM',
        title: 'Micronesia, Federated States of',
        countryCallingCode: '691',
    },
    { code: 'FO', title: 'Faroe Islands', countryCallingCode: '298' },
    {
        code: 'FR',
        title: 'France',
        countryCallingCode: '33',
        suggested: true,
    },
    { code: 'GA', title: 'Gabon', countryCallingCode: '241' },
    { code: 'GB', title: 'United Kingdom', countryCallingCode: '44' },
    { code: 'GD', title: 'Grenada', countryCallingCode: '1-473' },
    { code: 'GE', title: 'Georgia', countryCallingCode: '995' },
    { code: 'GF', title: 'French Guiana', countryCallingCode: '594' },
    { code: 'GG', title: 'Guernsey', countryCallingCode: '44' },
    { code: 'GH', title: 'Ghana', countryCallingCode: '233' },
    { code: 'GI', title: 'Gibraltar', countryCallingCode: '350' },
    { code: 'GL', title: 'Greenland', countryCallingCode: '299' },
    { code: 'GM', title: 'Gambia', countryCallingCode: '220' },
    { code: 'GN', title: 'Guinea', countryCallingCode: '224' },
    { code: 'GP', title: 'Guadeloupe', countryCallingCode: '590' },
    { code: 'GQ', title: 'Equatorial Guinea', countryCallingCode: '240' },
    { code: 'GR', title: 'Greece', countryCallingCode: '30' },
    {
        code: 'GS',
        title: 'South Georgia and the South Sandwich Islands',
        countryCallingCode: '500',
    },
    { code: 'GT', title: 'Guatemala', countryCallingCode: '502' },
    { code: 'GU', title: 'Guam', countryCallingCode: '1-671' },
    { code: 'GW', title: 'Guinea-Bissau', countryCallingCode: '245' },
    { code: 'GY', title: 'Guyana', countryCallingCode: '592' },
    { code: 'HK', title: 'Hong Kong', countryCallingCode: '852' },
    {
        code: 'HM',
        title: 'Heard Island and McDonald Islands',
        countryCallingCode: '672',
    },
    { code: 'HN', title: 'Honduras', countryCallingCode: '504' },
    { code: 'HR', title: 'Croatia', countryCallingCode: '385' },
    { code: 'HT', title: 'Haiti', countryCallingCode: '509' },
    { code: 'HU', title: 'Hungary', countryCallingCode: '36' },
    { code: 'ID', title: 'Indonesia', countryCallingCode: '62' },
    { code: 'IE', title: 'Ireland', countryCallingCode: '353' },
    { code: 'IL', title: 'Israel', countryCallingCode: '972' },
    { code: 'IM', title: 'Isle of Man', countryCallingCode: '44' },
    { code: 'IN', title: 'India', countryCallingCode: '91' },
    {
        code: 'IO',
        title: 'British Indian Ocean Territory',
        countryCallingCode: '246',
    },
    { code: 'IQ', title: 'Iraq', countryCallingCode: '964' },
    {
        code: 'IR',
        title: 'Iran, Islamic Republic of',
        countryCallingCode: '98',
    },
    { code: 'IS', title: 'Iceland', countryCallingCode: '354' },
    { code: 'IT', title: 'Italy', countryCallingCode: '39' },
    { code: 'JE', title: 'Jersey', countryCallingCode: '44' },
    { code: 'JM', title: 'Jamaica', countryCallingCode: '1-876' },
    { code: 'JO', title: 'Jordan', countryCallingCode: '962' },
    {
        code: 'JP',
        title: 'Japan',
        countryCallingCode: '81',
        suggested: true,
    },
    { code: 'KE', title: 'Kenya', countryCallingCode: '254' },
    { code: 'KG', title: 'Kyrgyzstan', countryCallingCode: '996' },
    { code: 'KH', title: 'Cambodia', countryCallingCode: '855' },
    { code: 'KI', title: 'Kiribati', countryCallingCode: '686' },
    { code: 'KM', title: 'Comoros', countryCallingCode: '269' },
    {
        code: 'KN',
        title: 'Saint Kitts and Nevis',
        countryCallingCode: '1-869',
    },
    {
        code: 'KP',
        title: "Korea, Democratic People's Republic of",
        countryCallingCode: '850',
    },
    { code: 'KR', title: 'Korea, Republic of', countryCallingCode: '82' },
    { code: 'KW', title: 'Kuwait', countryCallingCode: '965' },
    { code: 'KY', title: 'Cayman Islands', countryCallingCode: '1-345' },
    { code: 'KZ', title: 'Kazakhstan', countryCallingCode: '7' },
    {
        code: 'LA',
        title: "Lao People's Democratic Republic",
        countryCallingCode: '856',
    },
    { code: 'LB', title: 'Lebanon', countryCallingCode: '961' },
    { code: 'LC', title: 'Saint Lucia', countryCallingCode: '1-758' },
    { code: 'LI', title: 'Liechtenstein', countryCallingCode: '423' },
    { code: 'LK', title: 'Sri Lanka', countryCallingCode: '94' },
    { code: 'LR', title: 'Liberia', countryCallingCode: '231' },
    { code: 'LS', title: 'Lesotho', countryCallingCode: '266' },
    { code: 'LT', title: 'Lithuania', countryCallingCode: '370' },
    { code: 'LU', title: 'Luxembourg', countryCallingCode: '352' },
    { code: 'LV', title: 'Latvia', countryCallingCode: '371' },
    { code: 'LY', title: 'Libya', countryCallingCode: '218' },
    { code: 'MA', title: 'Morocco', countryCallingCode: '212' },
    { code: 'MC', title: 'Monaco', countryCallingCode: '377' },
    {
        code: 'MD',
        title: 'Moldova, Republic of',
        countryCallingCode: '373',
    },
    { code: 'ME', title: 'Montenegro', countryCallingCode: '382' },
    {
        code: 'MF',
        title: 'Saint Martin (French part)',
        countryCallingCode: '590',
    },
    { code: 'MG', title: 'Madagascar', countryCallingCode: '261' },
    { code: 'MH', title: 'Marshall Islands', countryCallingCode: '692' },
    {
        code: 'MK',
        title: 'Macedonia, the Former Yugoslav Republic of',
        countryCallingCode: '389',
    },
    { code: 'ML', title: 'Mali', countryCallingCode: '223' },
    { code: 'MM', title: 'Myanmar', countryCallingCode: '95' },
    { code: 'MN', title: 'Mongolia', countryCallingCode: '976' },
    { code: 'MO', title: 'Macao', countryCallingCode: '853' },
    {
        code: 'MP',
        title: 'Northern Mariana Islands',
        countryCallingCode: '1-670',
    },
    { code: 'MQ', title: 'Martinique', countryCallingCode: '596' },
    { code: 'MR', title: 'Mauritania', countryCallingCode: '222' },
    { code: 'MS', title: 'Montserrat', countryCallingCode: '1-664' },
    { code: 'MT', title: 'Malta', countryCallingCode: '356' },
    { code: 'MU', title: 'Mauritius', countryCallingCode: '230' },
    { code: 'MV', title: 'Maldives', countryCallingCode: '960' },
    { code: 'MW', title: 'Malawi', countryCallingCode: '265' },
    { code: 'MX', title: 'Mexico', countryCallingCode: '52' },
    { code: 'MY', title: 'Malaysia', countryCallingCode: '60' },
    { code: 'MZ', title: 'Mozambique', countryCallingCode: '258' },
    { code: 'NA', title: 'Namibia', countryCallingCode: '264' },
    { code: 'NC', title: 'New Caledonia', countryCallingCode: '687' },
    { code: 'NE', title: 'Niger', countryCallingCode: '227' },
    { code: 'NF', title: 'Norfolk Island', countryCallingCode: '672' },
    { code: 'NG', title: 'Nigeria', countryCallingCode: '234' },
    { code: 'NI', title: 'Nicaragua', countryCallingCode: '505' },
    { code: 'NL', title: 'Netherlands', countryCallingCode: '31' },
    { code: 'NO', title: 'Norway', countryCallingCode: '47' },
    { code: 'NP', title: 'Nepal', countryCallingCode: '977' },
    { code: 'NR', title: 'Nauru', countryCallingCode: '674' },
    { code: 'NU', title: 'Niue', countryCallingCode: '683' },
    { code: 'NZ', title: 'New Zealand', countryCallingCode: '64' },
    { code: 'OM', title: 'Oman', countryCallingCode: '968' },
    { code: 'PA', title: 'Panama', countryCallingCode: '507' },
    { code: 'PE', title: 'Peru', countryCallingCode: '51' },
    { code: 'PF', title: 'French Polynesia', countryCallingCode: '689' },
    { code: 'PG', title: 'Papua New Guinea', countryCallingCode: '675' },
    { code: 'PH', title: 'Philippines', countryCallingCode: '63' },
    { code: 'PK', title: 'Pakistan', countryCallingCode: '92' },
    { code: 'PL', title: 'Poland', countryCallingCode: '48' },
    {
        code: 'PM',
        title: 'Saint Pierre and Miquelon',
        countryCallingCode: '508',
    },
    { code: 'PN', title: 'Pitcairn', countryCallingCode: '870' },
    { code: 'PR', title: 'Puerto Rico', countryCallingCode: '1' },
    {
        code: 'PS',
        title: 'Palestine, State of',
        countryCallingCode: '970',
    },
    { code: 'PT', title: 'Portugal', countryCallingCode: '351' },
    { code: 'PW', title: 'Palau', countryCallingCode: '680' },
    { code: 'PY', title: 'Paraguay', countryCallingCode: '595' },
    { code: 'QA', title: 'Qatar', countryCallingCode: '974' },
    { code: 'RE', title: 'Reunion', countryCallingCode: '262' },
    { code: 'RO', title: 'Romania', countryCallingCode: '40' },
    { code: 'RS', title: 'Serbia', countryCallingCode: '381' },
    { code: 'RU', title: 'Russian Federation', countryCallingCode: '7' },
    { code: 'RW', title: 'Rwanda', countryCallingCode: '250' },
    { code: 'SA', title: 'Saudi Arabia', countryCallingCode: '966' },
    { code: 'SB', title: 'Solomon Islands', countryCallingCode: '677' },
    { code: 'SC', title: 'Seychelles', countryCallingCode: '248' },
    { code: 'SD', title: 'Sudan', countryCallingCode: '249' },
    { code: 'SE', title: 'Sweden', countryCallingCode: '46' },
    { code: 'SG', title: 'Singapore', countryCallingCode: '65' },
    { code: 'SH', title: 'Saint Helena', countryCallingCode: '290' },
    { code: 'SI', title: 'Slovenia', countryCallingCode: '386' },
    {
        code: 'SJ',
        title: 'Svalbard and Jan Mayen',
        countryCallingCode: '47',
    },
    { code: 'SK', title: 'Slovakia', countryCallingCode: '421' },
    { code: 'SL', title: 'Sierra Leone', countryCallingCode: '232' },
    { code: 'SM', title: 'San Marino', countryCallingCode: '378' },
    { code: 'SN', title: 'Senegal', countryCallingCode: '221' },
    { code: 'SO', title: 'Somalia', countryCallingCode: '252' },
    { code: 'SR', title: 'Suriname', countryCallingCode: '597' },
    { code: 'SS', title: 'South Sudan', countryCallingCode: '211' },
    {
        code: 'ST',
        title: 'Sao Tome and Principe',
        countryCallingCode: '239',
    },
    { code: 'SV', title: 'El Salvador', countryCallingCode: '503' },
    {
        code: 'SX',
        title: 'Sint Maarten (Dutch part)',
        countryCallingCode: '1-721',
    },
    {
        code: 'SY',
        title: 'Syrian Arab Republic',
        countryCallingCode: '963',
    },
    { code: 'SZ', title: 'Swaziland', countryCallingCode: '268' },
    {
        code: 'TC',
        title: 'Turks and Caicos Islands',
        countryCallingCode: '1-649',
    },
    { code: 'TD', title: 'Chad', countryCallingCode: '235' },
    {
        code: 'TF',
        title: 'French Southern Territories',
        countryCallingCode: '262',
    },
    { code: 'TG', title: 'Togo', countryCallingCode: '228' },
    { code: 'TH', title: 'Thailand', countryCallingCode: '66' },
    { code: 'TJ', title: 'Tajikistan', countryCallingCode: '992' },
    { code: 'TK', title: 'Tokelau', countryCallingCode: '690' },
    { code: 'TL', title: 'Timor-Leste', countryCallingCode: '670' },
    { code: 'TM', title: 'Turkmenistan', countryCallingCode: '993' },
    { code: 'TN', title: 'Tunisia', countryCallingCode: '216' },
    { code: 'TO', title: 'Tonga', countryCallingCode: '676' },
    { code: 'TR', title: 'Turkey', countryCallingCode: '90' },
    {
        code: 'TT',
        title: 'Trinidad and Tobago',
        countryCallingCode: '1-868',
    },
    { code: 'TV', title: 'Tuvalu', countryCallingCode: '688' },
    {
        code: 'TW',
        title: 'Taiwan, Province of China',
        countryCallingCode: '886',
    },
    {
        code: 'TZ',
        title: 'United Republic of Tanzania',
        countryCallingCode: '255',
    },
    { code: 'UA', title: 'Ukraine', countryCallingCode: '380' },
    { code: 'UG', title: 'Uganda', countryCallingCode: '256' },
    {
        code: 'US',
        title: 'United States',
        countryCallingCode: '1',
        suggested: true,
    },
    { code: 'UY', title: 'Uruguay', countryCallingCode: '598' },
    { code: 'UZ', title: 'Uzbekistan', countryCallingCode: '998' },
    {
        code: 'VA',
        title: 'Holy See (Vatican City State)',
        countryCallingCode: '379',
    },
    {
        code: 'VC',
        title: 'Saint Vincent and the Grenadines',
        countryCallingCode: '1-784',
    },
    { code: 'VE', title: 'Venezuela', countryCallingCode: '58' },
    {
        code: 'VG',
        title: 'British Virgin Islands',
        countryCallingCode: '1-284',
    },
    {
        code: 'VI',
        title: 'US Virgin Islands',
        countryCallingCode: '1-340',
    },
    { code: 'VN', title: 'Vietnam', countryCallingCode: '84' },
    { code: 'VU', title: 'Vanuatu', countryCallingCode: '678' },
    { code: 'WF', title: 'Wallis and Futuna', countryCallingCode: '681' },
    { code: 'WS', title: 'Samoa', countryCallingCode: '685' },
    { code: 'XK', title: 'Kosovo', countryCallingCode: '383' },
    { code: 'YE', title: 'Yemen', countryCallingCode: '967' },
    { code: 'YT', title: 'Mayotte', countryCallingCode: '262' },
    { code: 'ZA', title: 'South Africa', countryCallingCode: '27' },
    { code: 'ZM', title: 'Zambia', countryCallingCode: '260' },
    { code: 'ZW', title: 'Zimbabwe', countryCallingCode: '263' },
];

export default function CountrySelect({ error, helperText, onlyCountry = false, ...rest }) {
    if (onlyCountry) {
        return (
            <Autocomplete
                autoHighlight
                id="country-of-residence"
                options={countries}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt="country flag"
                        />
                        {option.title} ({option.code})
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={error}
                        helperText={helperText}
                        label="Country of residence *"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                        }}
                    />
                )}
                {...rest}
            />
        );
    }

    return (
        <Autocomplete
            autoHighlight
            id="country-select-demo"
            options={countries}
            getOptionLabel={(option) => `${option.title} +${option.countryCallingCode}`}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt="country flag"
                    />
                    {option.title} ({option.code}) +{option.countryCallingCode}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={helperText}
                    label="Country calling code *"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                    }}
                />
            )}
            {...rest}
        />
    );
}
