

const WEB = 'web';
const AMP = 'amp';

const getTechnology = ()=>{
	return process.env.TECHNOLOGY ? process.env.TECHNOLOGY : WEB;
};

const isAmpVersion = () => {
	return getTechnology() === AMP;
};

const isWebVersion = () => {
	return getTechnology() === WEB;
};


module.exports = {
	getTechnology,
	isAmpVersion,
	isWebVersion
};
