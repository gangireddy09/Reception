var CONSTANTS = {
	URL: {
		BASE: '/healthcare-api'
	}
};

var ONLY_NUMBER_REGEX   	= "/^[0-9]*$/";
var ONLY_ALPHABETS_REGEX	= "/^[a-zA-Z]*$/";
var FLOATNUMBERS_REGEX 		= "/^\d{0,9}(\.\d{1,9})?$/";
var EMAIL_REGEX				= "/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)$/";
var EMAIL_REGEX_2			= "/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/";//minimum 2 letters after Dot

var REFERRER_LIST = [
                     "Dr.Krishna Reddy M.B.B.S.,D.G.O.",
                     "Dr.B. Lakshmi Narayana M.S.Ortho",
                     "Dr.Vadrevu Ravi M.D.Derm",
                     "Dr.M. Seshadri Reddy M.D.Gen",
                     "Dr.P.V. Nishanth DNB(Cardiology), NIMS",
                     "Dr.N. Lakshmi Narayana Reddy M.S(ENT)",
                     "Dr.T.V. GopiNath M.D.Chest",
                     "Dr.Satya Prasad M.ch, Uro",
                     "Dr.G. Vara Prasad M.S.MCH., Neuro",
                     "Dr.S. Venkat Reddy M.D, D.M, Gastro",
                     "Dr.G. RaghuSwaroop B.P.T(M.P.T, Ortho)"
                      ];
var DISPENSER_LIST = [
                      "Priyanka",
                      "Bhavani",
                      "Devi",
                      "Brahman Reddy",
                      "Ayyappa",
                      "Venkat Rama Reddy",
                      "Maha Lakshmi"
                      ];