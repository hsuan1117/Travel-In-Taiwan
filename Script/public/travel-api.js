var TravelAPI = {
    // 臺南 API: https://www.twtainan.net/data/attractions_zh-tw.json
    // 臺北 API: https://www.travel.taipei/open-api/zh-tw/Attractions/All
    
    fetchTainan: function() {
        return axios.get('https://www.twtainan.net/data/attractions_zh-tw.json')
            .then(function(response) {
                return response.data.map(function(item) {
                    return {
                        id: 'tainan-' + item.id,
                        name: item.name,
                        summary: item.summary,
                        introduction: item.introduction,
                        address: item.address,
                        tel: item.tel,
                        district: item.district,
                        lat: item.lat,
                        lng: item.long,
                        category: item.category || [],
                        images: [], // 臺南此 API 似乎沒提供圖片
                        source: '臺南',
                        update_time: item.update_time
                    };
                });
            });
    },

    fetchTaipei: function(page) {
        page = page || 1;
        // 注意：臺北 API 通常需要 Accept: application/json header
        return axios.get('https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=' + page, {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            // 臺北 API 回傳格式通常是 { total: ..., data: [...] }
            var data = response.data.data || response.data;
            if (!Array.isArray(data)) return [];
            
            return data.map(function(item) {
                // 處理臺北 API 的特殊圖片欄位名稱
                var imgs = [];
                if (item.images && Array.isArray(item.images)) {
                    imgs = item.images.map(function(img) {
                        return img.src || img['<Src>k__BackingField'] || '';
                    }).filter(function(url) { return url !== ''; });
                }

                return {
                    id: 'taipei-' + item.id,
                    name: item.name,
                    summary: item.introduction ? item.introduction.substring(0, 100) + '...' : '',
                    introduction: item.introduction,
                    address: item.address,
                    tel: item.tel,
                    district: item.distric, // API 拼寫為 distric
                    lat: item.nlat,
                    lng: item.elong,
                    category: (item.category || []).map(function(c) { return c.name; }),
                    images: imgs,
                    source: '臺北',
                    update_time: item.modified
                };
            });
        });
    },

    fetchAll: function() {
        var tainanPromise = this.fetchTainan().catch(function(e) { 
            console.error("Tainan API Error:", e); 
            return []; 
        });
        var taipeiPromise = this.fetchTaipei(1).catch(function(e) { 
            console.error("Taipei API Error:", e); 
            return []; 
        });

        return Promise.all([
            tainanPromise,
            taipeiPromise
        ]).then(function(results) {
            return results[0].concat(results[1]);
        });
    }
};
