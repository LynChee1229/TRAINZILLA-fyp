@extends('app')

@section('content')
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <style>
            .backBtn {
                border: 1.5px solid #FF9999 !important;
            }

            .tableTitle {
                font-size: 1.6em;
                font-weight: bold;
                margin: auto;
                text-align: center;
                color: #000099;
            }

            .tableHeader {
                background-color: rgba(100, 149, 237, 0.5);
            }

            .tableStation {
                background-color: #6495ED;
                color: white;
            }

            #sb-content .content-card {
                width: fit-content;
            }

            .table {
                white-space: break-spaces;
            }

            .displayTime {
                font-weight: normal;
            }

            .table-bordered td, .table-bordered th {
                white-space: nowrap;
                padding-left: 9px;
                padding-right: 9px;
            }

        </style>
    </head>

    <div class="float-right newDiv mt-4 mr-4">
        <button class="btn discard-btn font-weight-bold backBtn" onclick="location.href='/adminroute'">Back</button>
    </div>
    <div class="card-ttl">Static Time Table of <strong>{{ $list->routeTitle }}</strong></div>

    <div id="first" class="mt-4">
        <div class="tableTitle">
            {{ $list->FirstTable[0]->stationName }} 
            to 
            {{ $list->FirstTable[count($list->FirstTable)-1]->stationName }}
        </div>
        <table id="firstTable" class="table table-sm table-bordered mt-2">
            <thead>
                <tr>
                    <th style="width:fit-content;" class="tableHeader">Station \ Trip No.</th>
                    @for($i=1; $i<=$list->routeTrainNum; $i++)
                        <th class="text-center tableStation">{{ $i }}</th>
                    @endfor
                </tr>
            </thead>
            <tbody class="viewTableBody">
                @foreach ($list->FirstTable as $sta1)
                    <tr>
                        <th class="tableStation" style="word-break:none; word-break:none;">{{ $sta1->stationName }}</th>
                        @foreach ($sta1->departTime as $time)
                            <th class="text-center displayTime">{{ $time }}</th>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div id="second" class="mt-5">
        <div class="tableTitle">
            {{ $list->SecondTable[0]->stationName }} 
            to 
            {{ $list->SecondTable[count($list->SecondTable)-1]->stationName }}
        </div>
        <table id="secondTable" class="table table-sm table-bordered mt-2">
            <thead>
                <tr>
                    <th style="width:fit-content;" class="tableHeader">Station \ Trip No.</th>
                    @for($i=1; $i<=$list->routeTrainNum; $i++)
                        <th class="text-center tableStation">{{ $i }}</th>
                    @endfor
                </tr>
            </thead>
            <tbody class="viewTableBody">
                @foreach ($list->SecondTable as $sta2)
                    <tr>
                        <th class="tableStation" style="word-break:none; word-break:none;">{{ $sta2->stationName }}</th>
                        @foreach ($sta2->departTime as $time)
                            <th class="text-center displayTime">{{ $time }}</th>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

@endsection