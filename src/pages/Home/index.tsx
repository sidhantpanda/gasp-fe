import React, { useState } from "react";
import Canvas from '../../components/canvas';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useQuery, useQueryCache } from 'react-query';
import { getDataForDate, getRanges } from '../../api/gasp-app';
import './home.css';

const options = [
  { value: 'fmi_no', label: 'fmi_no' },
  { value: 'fmi_no2', label: 'fmi_no2' },
  { value: 'fmi_pm10p0', label: 'fmi_pm10p0' },
  { value: 'fmi_pm2p5', label: 'fmi_pm2p5' },
  { value: 'fmi_rel_humid', label: 'fmi_rel_humid' },
  { value: 'fmi_so2', label: 'fmi_so2' },
  { value: 'fmi_temp_2m', label: 'fmi_temp_2m' },
  { value: 'fmi_windspeed_10m', label: 'fmi_windspeed_10m' },
  { value: 'megasense_aqi', label: 'megasense_aqi' },
  { value: 'megasense_co', label: 'megasense_co' },
  { value: 'megasense_no2', label: 'megasense_no2' },
  { value: 'megasense_o3', label: 'megasense_o3' },
  { value: 'megasense_pm10p0', label: 'megasense_pm10p0' },
  { value: 'megasense_pm2p5', label: 'megasense_pm2p5' }
];


const Home = () => {
  const queryCache = useQueryCache();

  const [startDate, setStartDate] = useState(new Date(2020, 7, 15));
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const fetcher = async (key: string, date: Date, field: string) => getDataForDate(date, field);
  const fetcherRange = async () => getRanges();

  const { isLoading: isLoadingData, error: errorData, data, refetch: refetchData } = useQuery(
    ['repoData', startDate, selectedOption.value],
    fetcher,
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const { isLoading: isLoadingRanges, error: errorRanges, data: dataRanges, refetch: refetchRanges } = useQuery(
    ['ranges'],
    fetcherRange,
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  );


  const handleSelectChange = (newSelection: any) => {
    setSelectedOption(newSelection);
    queryCache.invalidateQueries('repoData');
    // refetchData();
  }

  const ExampleCustomInput = ({ value, onClick }: any) => (
    <button
      style={{
        border: '2px solid #2684ff',
        borderRadius: '4px',
        height: '38px',
        // width: '100%'
        backgroundColor: 'white'
      }}
      className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );

  console.log('data', data);
  console.log('ranges', dataRanges);

  return (
    <div>
      <h2
        style={{
          paddingLeft: '1em'
        }}
      >GASP Dashboard </h2>
      <div
        className='container'
        style={{
          width: '26em',
          paddingLeft: '2em'
        }}
      >

        <div
          className='item'
        >
          <DatePicker
            selected={startDate}
            showTimeSelect
            dateFormat="Pp"
            fixedHeight
            minDate={new Date(2020, 5, 1)}
            maxDate={new Date(2020, 8, 30)}
            customInput={<ExampleCustomInput />}
            onChange={(date: Date) => {
              console.log('date in picker', date);
              setStartDate(date);
            }} />

        </div>
        <div
          className='item'
        >
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
          />
        </div>

      </div>
      {(isLoadingData || isLoadingRanges) &&
        <div
          style={{
            paddingLeft: '2em'
          }}
        >
          <br />
          <br />
          <br />
          <br />
          Loading...
      </div>
      }
      {(errorData || errorRanges) &&
        <div>
          An error has occurred:  {(errorData as any)!.message || (errorRanges as any)!.message}
        </div>
      }
      {(!(isLoadingData || isLoadingRanges) && !(errorData || errorRanges)) &&
        <Canvas data={data} field={selectedOption.value} range={dataRanges![selectedOption.value]} />
      }
    </div>
  );
}

export default Home;
