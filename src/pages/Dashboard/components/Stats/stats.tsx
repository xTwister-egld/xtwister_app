/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { t } from 'i18next';
import './stats.scss';
import Card from 'components/Layout/card';
import { useTranslation } from 'react-i18next';
import { apiUrl, contractAddress } from 'config';
import { GetLatestTransactionsType, getTransactions, TxsResponseFromApi } from 'apiRequests';

const Stats = () => {
    const [t] = useTranslation('global');
    const [values, setValue] = useState<[TxsResponseFromApi]>();

    const interfaz_deposit: GetLatestTransactionsType = {
        apiAddress: apiUrl,
        address: contractAddress,
        contractAddress: contractAddress,
        function_name: 'deposit',
        timeout: 1000,
        page: 10,
    };

    const fetchPost = async () => {
        const response = await getTransactions(interfaz_deposit)
        setValue(response.data)
    }
    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <Card className='statistics twister'>
            <button className='heading-leaderboard text-center'>{t('statistics')}</button>
            <div className='table-responsive data_statistics'>
                <table className='table table-striped '>
                    <thead>
                        <tr>
                            <th className='border-0 font-weight-normal'>{t('txHash')}</th>
                            <th className='border-0 font-weight-normal'>{t('time')}</th>
                            <th className='border-0 font-weight-normal'>{t('amount')}</th>
                        </tr>
                    </thead>
                    <tbody data-testid='statsList'>
                        {values?.map((value) => {

                            return (
                                <tr key={value.txHash}>
                                    <td>
                                        {'...' + value.txHash.substring(value.txHash.length - 8)}
                                    </td>
                                    <td className='stats-hash'>
                                        {format(Number(new Date(parseInt(value.timestamp) * 1000)), 'MM/dd kk:mm')}
                                    </td>
                                    <td>
                                        {parseInt(value.value) / 10 ** 18} EGLD
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>


                </table>
            </div>
        </Card>
    );
};

export default Stats;
