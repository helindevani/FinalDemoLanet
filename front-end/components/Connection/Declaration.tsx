import ImagePicker from "../ImagePicker/ImagePicker";

interface changeType{
  onChange : any
}

export default function Declaration({onChange} : changeType) {

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    onChange({ [name]: value}); 
  };

  return (
    <>
      <div>
        <b className="text-2xl py-5">Declaration </b>
        <div>
          <b>
            I Desire to take domestic LPG Connection in my name and affirm as
            under:
          </b>
          <br />
          1. That I am an Indian citizen or Non Resident Indian or staff of
          Foreign nationality serving in India or Foreign national residing in
          India under visa or person returning to India on transfer of residence
          basis or POI. <br />
          2. I am above 18 years of age.
          <br />
          3. That neither 1, nor any member of the household (household means a
          family consisting of husband, wife, unmarried children and dependent
          parents living together in a dwelling unit having common kitchen),
          possess any LPG connection from PSU oil Companies or piped Natural Gas
          Connection for domestic use in our dwelling unit (Households having
          piped Natural Gas Connection are not entitled for Subsidizes LPG).
          <br />
          4. I do not have Ration Card in my name of in the name of in the name
          of any member of my household as defined above. As and when a ration
          card is issued in my name or in the name of any of the members of the
          household the same shall be produced to Oil Company LPG Distributor
          for updating Records. (applicable if copy of ration card is not
          produced & verified)
          <br />
          5. That I am enclosing the KYC form filled in along with the proof of
          address (POA) and proof of identity (POI)
          <br />
          6. I confirm that the LPG Connection issued to me will be used in my
          above mentioned address and for domestic cooking purpose only and I
          shall abide by all terms governing its use.
          <br />
          7 That I shall not position any other LP gas installation in the same
          kitchen.
          <br />
          8. That as and when second cylinder is issued to me against this
          connection the same will also be used in the same kitchen and with the
          original Installation.
          <br />
          9. That whenever I change my residence from present address to
          another, I will inform the LPG distributor in writing in advance for
          change.
          <br />
        </div>
        <p >
          
          <input type="Checkbox" name="IsDeclarationAccept" value="true" onChange={handleChange}/>  <b>I Accept Above Declaration </b>
        </p>
      </div>
      
    </>
  );
}
