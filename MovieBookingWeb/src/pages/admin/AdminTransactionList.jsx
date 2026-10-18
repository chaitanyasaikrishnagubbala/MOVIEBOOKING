import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  getAllTransactions
} from "../../service/transactionService";


function AdminTransactionList() {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // GET ALL TRANSACTIONS
  // =========================

  const fetchTransactions = async () => {

    try {

      setLoading(true);

      const data = await getAllTransactions();

      setTransactions(data);

    } catch (error) {

      console.error(
        "Get Transactions Error:",
        error
      );

      alert("Failed to load transactions");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchTransactions();

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <>
        <Navbar />

        <main className="admin-list-page">

          <h2>
            Loading transactions...
          </h2>

        </main>

        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <main className="admin-list-page">

        {/* HEADER */}

        <div className="admin-list-header">

          <div>

            <h1>
              Transactions
            </h1>

            <p>
              View all payment transactions
            </p>

          </div>

        </div>


        {/* EMPTY STATE */}

        {transactions.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Transactions Found
            </h2>

          </div>

        ) : (

          <div className="admin-table-container">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Transaction ID
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Payment Method
                  </th>

                  <th>
                    Payment Status
                  </th>

                  <th>
                    Transaction Time
                  </th>

                </tr>

              </thead>


              <tbody>

                {transactions.map(
                  (transaction) => (

                    <tr
                      key={transaction.id}
                    >

                      {/* ID */}

                      <td>
                        {transaction.id}
                      </td>


                      {/* TRANSACTION ID */}

                      <td>
                        {transaction.transactionId ||
                          "-"}
                      </td>


                      {/* AMOUNT */}

                      <td>
                        ₹{transaction.amount}
                      </td>


                      {/* PAYMENT METHOD */}

                      <td>
                        {transaction.paymentMethod}
                      </td>


                      {/* PAYMENT STATUS */}

                      <td>

                        <span
                          className={
                            transaction.paymentStatus ===
                            "SUCCESS"
                              ? "booking-status confirmed"
                              : "booking-status cancelled"
                          }
                        >

                          {
                            transaction.paymentStatus
                          }

                        </span>

                      </td>


                      {/* TIME */}

                      <td>
                        {
                          transaction.transactionTime
                        }
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </main>

      <Footer />
    </>
  );
}


export default AdminTransactionList;