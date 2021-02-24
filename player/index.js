let url = `https://api.npoint.io/d6bd0efc05639084eb17/`;

getPlayerData(url).then((data) => {
    processPlayerData(data)
});

async function getPlayerData(url){
    try{
        let response = await fetch(url);
        let data = await response.json();
        if(data){
            return data;
        }
    }catch(err){
        return false;
    }    
}

function processPlayerData(data){
    let playerData = data.playerList.sort((a, b) => {
        return a.Value - b.Value;
    });
    if(data){
        let tab = "";
        for (let r of playerData) {
            let upcomingmatchList = ""; 
            let matchDate = "";
            r.UpComingMatchesList.forEach(element => {
                upcomingmatchList += `${element.CCode} vs ${element.VsCCode}`;
                matchDate = element.MDate;
            });
            tab += ` <div class="player">
                <div><img src="../player-images/${r.Id}.jpg"/></div> 
                <p>${r.PFName}</p> 
                <p>${r.SkillDesc}</p>  
                <p>$${r.Value}</p>   
                <p>Upcoming Matches: ${upcomingmatchList}</p>  
                <p>Next Match Time: ${matchDate}</p>      
            </div>`;
        } 
        document.getElementById("loading").style.display = "none";
        document.getElementById("players").innerHTML = tab;
    }
}