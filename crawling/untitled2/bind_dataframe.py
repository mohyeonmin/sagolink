#TODO : HARD CORD + 교통사고라고 네이버 지식인에다가 쳤을 때 확인 되는 글들
from operator import eq

import pandas as pd

#TODO: dataframe 생성
data = {'date':[],'treatment':[], 'agreement':[], 'accident':[], 'gross_negligence':[],
        'obstacle':[],'korean_medicine':[],  'police_situation':[], 'repair_cost':[],
        'professional':[], 'etc':[], 'month_data_total':[]}

dataframe = pd.DataFrame(data)

total_data = {'date':[],'treatment':[], 'agreement':[], 'accident':[], 'gross_negligence':[],
        'obstacle':[],'korean_medicine':[],  'police_situation':[], 'repair_cost':[],
        'professional':[], 'etc':[], 'month_data_total':[]}

total_dataframe = pd.DataFrame(total_data)


#TODO: 년도하고 월 자동으로 변경시키기
#TODO: 년도 변경
for year in range(2003,2020):
    #TODO: 월 변경
    for month in range(1,13):
        # print(year)
        # print(month)
        #TODO: month 글자수 확인해서 대입
        if len(str(month)) == 1:
            month = "0" + str(month)

        data_file = str(year)+"/"+str(year)+"_"+str(month)+".xlsx"
        # print(data_file)

        df = pd.read_excel(data_file)

        #TODO: 중복 확인 아직 확인 안됨

        #TODO: 초기화

        #TODO: 총 갯수 : total -> 배열로 만들어서 데이터프레임으로 완성 시킬 수 있는가?
        month_data_total = 0

        #TODO: 합의 -> 단어에서 확인하기 / 치료 -> category에서 확인하기 /
        # 1차적으로 확인해서 필터를 할 수 있다.

        #TODO: 치료

        total_month_treatment =0

        #TODO: 합의

        total_month_agreement = 0

        #TODO : 과실

        total_month_accident =0
        #TODO: 중과실

        total_month_gross_negligence = 0


        #TODO : 장해 or 장애+후유증

        total_month_obstacle =0
        #TODO: 한의학, 침, 한방병원, 한의원

        total_month_korean_medicine =0
        #TODO: 경찰

        total_month_police_situation = 0
        #TODO: 수리비 + 견적

        total_month_repair_cost = 0


        #TODO: 사정인 or 전문가

        total_month_professional = 0

        #TODO: 기타
        total_month_etc = 0

        date = str(year) + str(month)

        #TODO: 최종 데이터 형태는  날짜 + category + 갯수

        for i in range(0, len(df)):
            treatment = 0
            agreement = 0
            accident = 0
            gross_negligence = 0
            obstacle = 0
            korean_medicine = 0
            police_situation = 0
            repair_cost = 0
            professional = 0
            etc = 0
            month_data_total+=1

            # TODO : category 에서 찾기
            if str(df.iloc[i].category).find("과") != -1 or "한의학" in df.iloc[i].category:
                treatment += 1
                total_month_treatment+=1
                if str(df.iloc[i].category).find("한방") != -1 or "한의학" in df.iloc[i].category:
                    korean_medicine += 1
                    total_month_korean_medicine+=1
            # TODO: title or content에서 찾기
            if str(df.iloc[i].title).find("합의") != -1 or str(df.iloc[i].main_content).find("합의") != -1:
                agreement += 1
                total_month_agreement+=1

            if str(df.iloc[i].title).find("경찰") != -1 or str(df.iloc[i].main_content).find("경찰") != -1:
                police_situation += 1
                total_month_police_situation+=1

            if str(df.iloc[i].title).find("장애") != -1 or str(df.iloc[i].main_content).find("장애") != -1 or str(df.iloc[i].title).find(
                    "장해") != -1 or str(df.iloc[i].main_content).find("장해") != -1 or str(df.iloc[i].title).find("후유증") != -1 or str(df.iloc[i].main_content).find("후유증") != -1:
                obstacle += 1
                total_month_obstacle+=1

            if str(df.iloc[i].title).find("과실") != -1 or str(df.iloc[i].main_content).find("과실") != -1:
                accident += 1
                total_month_accident+=1

            if str(df.iloc[i].title).find("횡단보도") != -1 or str(df.iloc[i].main_content).find("횡단보도") != -1 or str(df.iloc[i].title).find("음주운전") != -1 or str(df.iloc[i].main_content).find("음주운전") != -1 \
                    or str(df.iloc[i].title).find("뺑소니") != -1 or str(df.iloc[i].main_content).find("뺑소니") != -1:
                gross_negligence += 1
                total_month_gross_negligence+=1

            if str(df.iloc[i].title).find("수리비") != -1 or str(df.iloc[i].main_content).find("수리비") != -1 or str(df.iloc[i].title).find("견적") != -1 or str(df.iloc[i].main_content).find("견적") != -1:
                repair_cost += 1
                total_month_repair_cost+=1
            if str(df.iloc[i].title).find("손해사정") != -1 or str(df.iloc[i].main_content).find("손해사정") != -1 or str(df.iloc[i].title).find("전문가") != -1 or str(df.iloc[i].main_content).find("전문가") != -1:
                professional += 1
                total_month_professional+=1
            if treatment != 1 and korean_medicine !=1 and agreement != 1 and police_situation != 1 and obstacle != 1 and accident != 1 and gross_negligence != 1 and repair_cost != 1 and professional != 1 :
                etc +=1
                total_month_etc+=1
            dataframe = dataframe.append(
                {'date': date, 'treatment': treatment, 'agreement': agreement, 'accident': accident,
                 'gross_negligence': gross_negligence,
                 'obstacle': obstacle, 'korean_medicine': korean_medicine, 'police_situation': police_situation,
                 'repair_cost': repair_cost,
                 'professional': professional, 'etc':etc, 'month_data_total': None }, ignore_index=True)

        print("treatment:" +str(treatment))
        print("korean_medicine:"+ str(korean_medicine))
        print("agreement:" + str(agreement))
        print("police_situation:" + str(police_situation))
        print("obstacle:" + str(obstacle))
        print("accident:" +str(accident))
        print("gross_negligence: " +str(gross_negligence))
        print("repair_cost: " + str(repair_cost))
        print("professional: " + str(professional))
        print("total:" + str(month_data_total))


        total_dataframe = total_dataframe.append({'date':date,'treatment':total_month_treatment, 'agreement':total_month_agreement, 'accident':total_month_accident, 'gross_negligence':total_month_gross_negligence,
        'obstacle':total_month_obstacle,'korean_medicine':total_month_korean_medicine,  'police_situation':total_month_police_situation, 'repair_cost':total_month_repair_cost,
        'professional':total_month_professional, 'etc' : total_month_etc, 'month_data_total':month_data_total, }, ignore_index = True)

        print(dataframe)
        print("====================================")


dataframe.to_excel("crawiling_data.xlsx", encoding='utf-8-sig')

total_dataframe.to_excel("total_dataframe.xlsx", encoding='utf-8-sig')