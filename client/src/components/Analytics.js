import React from 'react'
import { Progress } from 'antd'
const Analytics = ({ allTransection }) => {

  //catagory
  const catagories = ['salary', 'project', 'food', 'movie', 'biils', 'tax', 'medical', 'fee']





  const totalTransection = allTransection.length;
  const totalIncomeTransection = allTransection.filter(transaction => transaction.type === 'income')
  const totalExpenseTransection = allTransection.filter(transaction => transaction.type === 'expense')
  const totalIncomePercent = (totalIncomeTransection.length / totalTransection) * 100;
  const totalExpensePercent = (totalExpenseTransection.length / totalTransection) * 100;


  //Total turnover

  const totalTurnover = allTransection.reduce((acc, transaction) => acc + transaction.amount, 0)

  const totalincomeTurnover = allTransection.filter((transaction) => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)

  const totalExpenseTurnover = allTransection.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)

  const totalincomeTurnoverPercent = (totalincomeTurnover / totalTurnover) * 100
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100

  return (
    <div>
      <div className="row m-3   ">
        <div className="col-md-3 text-center">
          <div className="card">
            <div className="card-header text-white" style={{ backgroundColor: '#014F7F' }}>
              Total Transactions = {totalTransection}
            </div>
            <div className="card-body">
              <h5 className='text-success'><b>Income</b>: {totalIncomeTransection.length}</h5>
              <h5 className='text-danger'><b>Expense</b>: {totalExpenseTransection.length}</h5>

              <div className='progress_percent'>
                <Progress type='circle' strokeColor={'green'} className='mx-2 ' percent={totalIncomePercent.toFixed(0)} />
                <Progress type='circle' strokeColor={'red'} className='mx-2 ' percent={totalExpensePercent.toFixed(0)} />

              </div>

            </div>
          </div>
        </div>

        <div className="col-md-3 text-center">
          <div className="card">
            <div className="card-header text-white" style={{ backgroundColor: '#014F7F' }}>
              Total Turnover = {`${totalTurnover} Rs`}
            </div>
            <div className="card-body">
              <h5 className='text-success'><b>Income</b>: {totalincomeTurnover}</h5>
              <h5 className='text-danger'><b>Expense</b>: {totalExpenseTurnover}</h5>

              <div className='progress_percent'>
                <Progress type='circle' strokeColor={'green'} className='mx-2 ' percent={totalincomeTurnoverPercent.toFixed(0)} />
                <Progress type='circle' strokeColor={'red'} className='mx-2 ' percent={totalExpenseTurnoverPercent.toFixed(0)} />

              </div>

            </div>
          </div>
        </div>



        <div className="col-md-3 ">

          {/* Income catagory */}
          <h5 className='income' style={{ backgroundColor: '#014F7F' }} >Categorywise Income</h5>
          {
            catagories.map(category => {
              const amount = allTransection.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
              return (
                amount > 0 &&
                <div className='gp'>
                  <div className="card ">
                    <div className="card-body ">

                      <h5>{`${category} (${amount}) Rs`}</h5>
                      <Progress  percent={((amount / totalincomeTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>

        <div className="col-md-3 ">
          <h5 className='expence' style={{ backgroundColor: '#014F7F' }}>Categorywise Expense</h5>
          {
            catagories.map(category => {
              const amount = allTransection.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
              return (
                console.log(category),
                amount > 0 &&

                <div className='gp'>
                  <div className="card">
                    <div className="card-body ">

                      <h5>{`${category} (${amount}) Rs`}</h5>
                      <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                </div>


              )
            })
          }
        </div>


      </div>
    </div>
  )
}

export default Analytics
